'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import styles from './Carousel.module.css';

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

export default function Carousel({ slides, options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // Touch events for swiping on mobile Mouse events for dragging on desktop covered by Embla
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        emblaApi?.scrollPrev();
        break;
      case 'ArrowRight':
        emblaApi?.scrollNext();
        break;
      case 'Home':
        emblaApi?.scrollTo(0);
        break;
      case 'End':
        emblaApi?.scrollTo(slides.length - 1);
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <section className={styles.embla}>
      <div
        className={styles.emblaViewport}
        ref={emblaRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Task carousel"
      >
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div
              className={styles.emblaSlide}
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
