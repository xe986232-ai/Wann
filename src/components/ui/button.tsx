import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const base =
  "box-border inline-flex items-center justify-center min-w-[185px] min-h-[52px] rounded-[32px] px-6 py-3 text-base font-medium font-sans transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-foreground hover:bg-accent-hover",
  secondary: "bg-surface-2 text-foreground hover:bg-[#33383f]",
  link: "min-w-0 min-h-0 px-0 py-0 text-muted font-normal hover:text-foreground",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
