import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "light" | "dark" | "cream";
}

const backgroundStyles = {
  light: "bg-white text-[var(--color-text)]",
  dark: "bg-[var(--color-secondary)] text-white",
  cream: "bg-[var(--color-cream)] text-[var(--color-text)]",
};

export function SectionWrapper({
  id,
  children,
  className,
  background = "light",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 lg:py-24",
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  );
}
