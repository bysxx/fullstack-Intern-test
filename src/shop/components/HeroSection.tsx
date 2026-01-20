import type { Hero } from '@/product/model/product.types';
import Button from '@/shared/components/Button';

interface HeroSectionProps {
  hero: Hero;
}

const HeroSection = ({ hero }: HeroSectionProps) => {
  const { headline, subCopy, ctaText } = hero;

  return (
    <section className="relative w-full bg-[#FAFAFA] border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl flex flex-col items-center animate-fade-in-up">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-gray-900 sm:text-7xl mb-8 leading-tight">
            {headline}
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 font-sans max-w-xl mb-12">
            {subCopy}
          </p>
          <Button size="md" variant="primary">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
