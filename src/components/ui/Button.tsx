import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]",
  secondary:
    "bg-[var(--color-secondary)] text-white hover:bg-[#2a2a2a] focus:ring-[var(--color-secondary)]",
  outline:
    "bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm min-h-[40px]",
  md: "px-6 py-3 text-base min-h-[48px]",
  lg: "px-8 py-4 text-lg min-h-[56px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  fullWidth = false,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {children}
    </button>
  );
}
