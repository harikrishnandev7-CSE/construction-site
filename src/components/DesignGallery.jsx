import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Maximize, X, ChevronRight } from 'lucide-react';
import { designs } from '../data/designs';
import styles from './DesignGallery.module.css';

function DesignCard({ design, onOpen, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay: (index % 2) * 0.06 }}
    >
      <div className={styles.imageWrap}>
        <img
          src={design.image}
          alt={design.imageAlt}
          className={styles.image}
          loading="lazy"
          width={800}
          height={500}
        />
        {design.badge && (
          <span className={styles.badge}>{design.badge}</span>
        )}
        <div className={styles.styleTag}>{design.style}</div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{design.name}</h3>
        <div className={styles.specs}>
          <span className={styles.spec}>
            <Bed size={14} aria-hidden="true" /> {design.bedrooms} Bed
          </span>
          <span className={styles.spec}>
            <Bath size={14} aria-hidden="true" /> {design.bathrooms} Bath
          </span>
          <span className={styles.spec}>
            <Maximize size={14} aria-hidden="true" /> {design.squareFeet.toLocaleString()} sq ft
          </span>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.price}>
            <span className={styles.priceLabel}>Starting at</span>
            <span className={styles.priceValue}>{design.startingAt}</span>
          </div>
          <button
            className={`btn btn-outline btn-sm ${styles.viewBtn}`}
            onClick={() => onOpen(design)}
            aria-label={`View details for ${design.name}`}
          >
            View Design <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DesignModal({ design, onClose }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  // Focus trap
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const handleConsultClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('consultation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        ref={modalRef}
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${design.name} design details`}
      >
        <button
          ref={closeRef}
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close design modal"
        >
          <X size={20} />
        </button>

        <div className={styles.modalGrid}>
          <div className={styles.modalImageWrap}>
            <img
              src={design.image}
              alt={design.imageAlt}
              className={styles.modalImage}
              width={800}
              height={600}
            />
            {design.badge && (
              <span className={styles.badge}>{design.badge}</span>
            )}
          </div>

          <div className={styles.modalContent}>
            <span className={styles.modalStyle}>{design.style}</span>
            <h2 className={styles.modalTitle}>{design.name}</h2>

            <div className={styles.modalSpecs}>
              <div className={styles.modalSpec}>
                <Bed size={18} aria-hidden="true" />
                <div>
                  <span className={styles.modalSpecLabel}>Bedrooms</span>
                  <span className={styles.modalSpecValue}>{design.bedrooms}</span>
                </div>
              </div>
              <div className={styles.modalSpec}>
                <Bath size={18} aria-hidden="true" />
                <div>
                  <span className={styles.modalSpecLabel}>Bathrooms</span>
                  <span className={styles.modalSpecValue}>{design.bathrooms}</span>
                </div>
              </div>
              <div className={styles.modalSpec}>
                <Maximize size={18} aria-hidden="true" />
                <div>
                  <span className={styles.modalSpecLabel}>Built-up Area</span>
                  <span className={styles.modalSpecValue}>{design.squareFeet.toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>

            <div className={styles.modalHighlights}>
              <h3 className={styles.highlightsTitle}>Key Features</h3>
              <ul className={styles.highlightsList}>
                {design.highlights.map((h) => (
                  <li key={h} className={styles.highlightItem}>
                    <span className={styles.highlightDot} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.modalPricing}>
              <div>
                <span className={styles.priceLabel}>Starting at</span>
                <div className={styles.modalPrice}>{design.startingAt}</div>
                <span className={styles.priceNote}>*Estimate only. Final quote based on site visit.</span>
              </div>
            </div>

            <button
              className={`btn btn-primary ${styles.modalCta}`}
              onClick={handleConsultClick}
            >
              Get This Design's Estimate
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DesignGallery() {
  const [openDesign, setOpenDesign] = useState(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const handleOpen = useCallback((design) => setOpenDesign(design), []);
  const handleClose = useCallback(() => setOpenDesign(null), []);

  return (
    <section id="designs" className={`section ${styles.gallery}`} aria-labelledby="designs-heading">
      <div className="container">
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">Home Designs</span>
          </div>
          <h2 id="designs-heading" className="section-heading">
            Find Your{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              Perfect Style
            </em>
          </h2>
          <p className={styles.subheading}>
            Explore our curated home design portfolio — each one customizable to your plot and preferences.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {designs.map((design, index) => (
            <DesignCard
              key={design.id}
              design={design}
              index={index}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openDesign && (
          <DesignModal design={openDesign} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
