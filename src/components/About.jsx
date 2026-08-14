import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { about } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './About.module.css';

function StatItem({ stat, isActive }) {
  const prefersReduced = usePrefersReducedMotion();
  const count = useCountUp(stat.value, 1800, prefersReduced ? true : isActive);

  return (
    <motion.div
      className={styles.statItem}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isActive ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.statValue}>
        {count}
        {stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.08 },
    },
  };

  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.grid} ref={ref}>
          {/* Left: Text */}
          <motion.div
            className={styles.textCol}
            variants={sectionVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="section-label">
              <span className="section-eyebrow">{about.eyebrow}</span>
            </div>

            <h2 id="about-heading" className={`section-heading ${styles.heading}`}>
              {about.heading.split('\n').map((line, i) => (
                <span key={i} className={styles.headingLine}>
                  {i === 1 ? <em className={styles.headingItalic}>{line}</em> : line}
                </span>
              ))}
            </h2>

            <div className={styles.paragraphs}>
              {about.paragraphs.map((para, i) => (
                <p key={i} className={styles.paragraph}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className={styles.imageCol}
            variants={imageVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.imageFrame}>
              <img
                src={about.image}
                alt={about.imageAlt}
                className={styles.image}
                loading="lazy"
                width={900}
                height={700}
              />
              <div className={styles.imageBadge} aria-hidden="true">
                <span className={styles.badgeNumber}>500+</span>
                <span className={styles.badgeText}>Homes Built</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className={styles.statsRow}>
          {about.stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatItem stat={stat} isActive={statsInView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
