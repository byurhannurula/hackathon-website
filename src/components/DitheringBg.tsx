"use client";

import { useEffect, useRef } from "react";

interface DitheringBgProps {
  speed?: number;
  hovered?: boolean;
}

// Ordered 4×4 Bayer dithering with acid-green palette, animated warp noise.
// Replaces the hero background — no external dependency needed.
export function DitheringBg({ speed = 0.15, hovered = false }: DitheringBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const t0Ref = useRef(0);

  const VS = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FS = `
    precision mediump float;
    uniform float u_time;
    uniform vec2  u_res;
    uniform float u_speed;

    // 4×4 Bayer matrix (normalized 0–1)
    float bayer4[16];
    void initBayer() {
      bayer4[0]  =  0.0/16.0; bayer4[1]  =  8.0/16.0; bayer4[2]  =  2.0/16.0; bayer4[3]  = 10.0/16.0;
      bayer4[4]  = 12.0/16.0; bayer4[5]  =  4.0/16.0; bayer4[6]  = 14.0/16.0; bayer4[7]  =  6.0/16.0;
      bayer4[8]  =  3.0/16.0; bayer4[9]  = 11.0/16.0; bayer4[10] =  1.0/16.0; bayer4[11] =  9.0/16.0;
      bayer4[12] = 15.0/16.0; bayer4[13] =  7.0/16.0; bayer4[14] = 13.0/16.0; bayer4[15] =  5.0/16.0;
    }
    float bayerVal(vec2 coord) {
      initBayer();
      int x = int(mod(coord.x, 4.0));
      int y = int(mod(coord.y, 4.0));
      return bayer4[y * 4 + x];
    }

    // Smooth noise
    float hash(vec2 p) {
      p = fract(p * vec2(127.1, 311.7));
      p += dot(p, p + 19.19);
      return fract(p.x * p.y);
    }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1,0)), u.x),
        mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
        u.y
      );
    }
    float fbm(vec2 p) {
      float v = 0.0; float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p); p *= 2.1; a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      float t = u_time * u_speed;

      // Warp — shift UV with fbm to get organic movement
      vec2 warp = vec2(
        fbm(uv * 2.2 + vec2(t * 0.4, t * 0.15)),
        fbm(uv * 2.2 + vec2(t * 0.3 + 5.2, t * 0.2 + 1.8))
      );
      float n = fbm(uv * 1.8 + warp * 0.9 + t * 0.08);

      // Radial vignette — stronger edges, open center
      vec2 centered = uv - 0.5;
      float vignette = 1.0 - dot(centered, centered) * 2.8;
      n *= clamp(vignette, 0.0, 1.0);

      // Dither: compare noise against bayer threshold
      float threshold = bayerVal(gl_FragCoord.xy);
      float dithered = step(threshold, n);

      // Acid green #C8FF00 tinted output at low opacity
      // bg is transparent (black), dots are acid green
      vec3 acid = vec3(0.784, 1.0, 0.0);  // #C8FF00
      vec3 col  = acid * dithered;

      // Output: visible only where dithered=1, rest transparent
      gl_FragColor = vec4(col, dithered * 0.55);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    glRef.current = gl;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("Could not create shader");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    progRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    t0Ref.current = performance.now();

    const loop = () => {
      const t = (performance.now() - t0Ref.current) / 1000;
      gl.uniform1f(gl.getUniformLocation(prog, "u_time"), t);
      gl.uniform2f(
        gl.getUniformLocation(prog, "u_res"),
        canvas.width,
        canvas.height
      );
      gl.uniform1f(gl.getUniformLocation(prog, "u_speed"), speed);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [speed, FS, VS]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
