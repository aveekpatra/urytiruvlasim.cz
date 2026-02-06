import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Icon } from "@/components/ui/Icon";
import type { Feature } from "@/types";

interface USPSectionProps {
  features: Feature[];
}

export function USPSection({ features }: USPSectionProps) {
  return (
    <SectionWrapper id="proc-my" background="cream">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[var(--color-secondary)]">
          Proč právě u nás?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {features.map((feature) => (
            <div key={feature.icon} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon
                    name={feature.icon}
                    className="w-10 h-10 text-[var(--color-primary)]"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)]">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-light)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
