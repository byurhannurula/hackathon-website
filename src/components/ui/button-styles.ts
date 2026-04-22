// Shared size + variant tokens used by FormButton and Link (when rendered as a button).

export const buttonSizes = {
  sm: {
    input: "py-2.5 px-3.5 text-xs",
    label: "text-[9px] mb-1.5",
    button: "py-2.5 px-5 text-sm",
  },
  md: {
    input: "py-3 px-4 text-sm",
    label: "text-[10px] mb-2",
    button: "py-3.5 px-7 text-base",
  },
  lg: {
    input: "py-4 px-5 text-sm",
    label: "text-[10px] mb-2",
    button: "py-5 px-9 text-[22px]",
  },
} as const;

export type ButtonSize = keyof typeof buttonSizes;

export const buttonVariants = {
  primary:
    "bg-acid text-black border-none hover:bg-white hover:scale-[1.02] hover:-translate-y-px active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-acid disabled:hover:scale-100 disabled:hover:translate-y-0",
  secondary:
    "bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-acid hover:text-acid",
  ghost: "bg-transparent text-muted border border-white/15 hover:border-white/30 hover:text-white",
  outline: "bg-transparent text-acid border border-acid/30 hover:bg-acid/7",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export const buttonBase =
  "inline-flex items-center justify-center gap-x-2 font-display tracking-[0.08em] cursor-pointer transition-all duration-200";
