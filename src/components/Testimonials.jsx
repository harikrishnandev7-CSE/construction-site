import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Testimonials.module.css';

function StarRating({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const intervalRef = useRef(null);

  const total = testimonials.length;

  const go = useCallback((idx) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  // Auto-advance
  useEffect(() => {
    if (prefersReduced || isHovered) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5500);
    return () => clearInterval(intervalRef.current);
  }, [prefersReduced, isHovered, total]);

  const t = testimonials[current];

  return (
    <section
      className={`section ${styles.testimonials}`}
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="container">
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">Client Stories</span>
          </div>
          <h2 id="testimonials-heading" className="section-heading">
            Real Families,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              Real Homes
            </em>
          </h2>
        </motion.div>

        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className={styles.slide}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
              aria-atomic="true"
            >
              {t.image && (
                <div className={styles.imageCol}>
                  <img src={t.image} alt={t.homeType} className={styles.houseImage} loading="lazy" />
                  <div className={styles.imageBadge}>Built by Aadhira</div>
                </div>
              )}
              <div className={styles.contentCol}>
                <div className={styles.quoteIcon} aria-hidden="true">"</div>
                <blockquote className={styles.quote}>
                  <p className={styles.quoteText}>{t.quote}</p>
                </blockquote>
                <div className={styles.author}>
                  <div className={styles.avatar} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{t.name}</span>
                    <span className={styles.authorMeta}>{t.location}</span>
                    <span className={styles.authorHome}>{t.homeType}</span>
                  </div>
                  <StarRating count={t.rating} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className={styles.controls}>
            <button
              className={styles.controlBtn}
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={i === current}
                />
              ))}
            </div>

            <button
              className={styles.controlBtn}
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
