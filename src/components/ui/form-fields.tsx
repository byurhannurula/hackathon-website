import React from "react";
import { cn } from "@/lib/utils";
import {
  buttonSizes as sizes,
  buttonVariants,
  buttonBase,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export type FieldSize = ButtonSize;

// ─── LABEL ──────────────────────────────────────────────────────────────────
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: FieldSize;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block font-mono tracking-[0.14em] text-muted uppercase",
        sizes[size].label,
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
);
FormLabel.displayName = "FormLabel";

// ─── INPUT ──────────────────────────────────────────────────────────────────
interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: FieldSize;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, size = "md", error, ...props }, ref) => (
    <>
      <input
        ref={ref}
        className={cn(
          "w-full bg-white/3 border border-white/12 text-white font-mono outline-none transition-all duration-200 focus:border-acid focus:shadow-[0_0_0_1px_rgba(254,238,4,0.15)]",
          error && "border-red-500/60 focus:border-red-500",
          sizes[size].input,
          className
        )}
        {...props}
      />
      {error && <p className="font-mono text-[10px] text-red-400 mt-1">{error}</p>}
    </>
  )
);
FormInput.displayName = "FormInput";

// ─── TEXTAREA ───────────────────────────────────────────────────────────────
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: FieldSize;
  error?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, size = "md", error, ...props }, ref) => (
    <div>
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-white/3 border border-white/12 text-white font-mono outline-none transition-all duration-200 focus:border-acid focus:shadow-[0_0_0_1px_rgba(254,238,4,0.15)] resize-none",
          error && "border-red-500/60 focus:border-red-500",
          sizes[size].input,
          className
        )}
        {...props}
      />
      {error && <p className="font-mono text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  )
);
FormTextarea.displayName = "FormTextarea";

// ─── SELECT ─────────────────────────────────────────────────────────────────
interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: FieldSize;
  error?: string;
  options: string[];
  placeholder?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, size = "md", error, options, placeholder = "—", ...props }, ref) => (
    <div>
      <select
        ref={ref}
        className={cn(
          "w-full bg-white/3 border border-white/12 text-white font-mono outline-none transition-all duration-200 focus:border-acid focus:shadow-[0_0_0_1px_rgba(254,238,4,0.15)] appearance-none cursor-pointer",
          error && "border-red-500/60 focus:border-red-500",
          sizes[size].input,
          className
        )}
        style={{ colorScheme: "dark" }}
        {...props}
      >
        <option value="" disabled hidden style={{ background: "#0a0a0a", color: "#fff" }}>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#0a0a0a", color: "#fff" }}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="font-mono text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  )
);
FormSelect.displayName = "FormSelect";

// ─── CHECKBOX ───────────────────────────────────────────────────────────────
interface FormCheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "label"
> {
  label: React.ReactNode;
  error?: string;
}

export const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, error, ...props }, ref) => (
    <div>
      <label className={cn("flex items-start gap-3 cursor-pointer group", className)}>
        <input
          ref={ref}
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-acid cursor-pointer transition-transform duration-150 active:scale-75 checked:animate-[checkBounce_0.25s_ease]"
          {...props}
        />
        <span className="font-mono text-[11px] text-white/50 leading-[1.6] group-hover:text-white/70 transition-colors duration-200">
          {label}
        </span>
      </label>
      {error && <p className="font-mono text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  )
);
FormCheckbox.displayName = "FormCheckbox";

// ─── BUTTON ─────────────────────────────────────────────────────────────────
interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FieldSize;
  variant?: ButtonVariant;
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ className, size = "md", variant = "primary", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonBase, sizes[size].button, buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);
FormButton.displayName = "FormButton";
