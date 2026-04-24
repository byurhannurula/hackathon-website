interface ToastProps {
  message: string;
  type: "ok" | "error";
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-70 px-6 py-4 font-mono text-[13px] border shadow-lg ${
        type === "ok"
          ? "bg-emerald-950 border-emerald-500/40 text-emerald-400"
          : "bg-red-950 border-red-500/40 text-red-400"
      } animate-[fadeIn_0.3s_ease]`}
    >
      {message}
    </div>
  );
}
