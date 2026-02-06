import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StarRating } from "@/components/ui/Icon";
import type { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const sourceLabels: Record<string, string> = {
    google: "Google Recenze",
    tripadvisor: "TripAdvisor",
    facebook: "Facebook",
  };

  return (
    <SectionWrapper id="recenze" background="light">
      <Container>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[var(--color-secondary)]">
          Co o nás říkají hosté
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[var(--color-cream)] rounded-2xl p-6 sm:p-8"
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-6 mb-6">
                <p className="text-lg text-[var(--color-text)] italic leading-relaxed">
                  "{review.text}"
                </p>
              </blockquote>
              <footer className="flex items-center justify-between">
                <cite className="not-italic font-semibold text-[var(--color-secondary)]">
                  — {review.author}
                </cite>
                {review.source && (
                  <span className="text-sm text-[var(--color-text-light)]">
                    {sourceLabels[review.source] || review.source}
                  </span>
                )}
              </footer>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
