import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { whyChooseUs } from '../data/content';
import styles from './WhyChooseUs.module.css';

function FeatureItem({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = LucideIcons[feature.icon] || LucideIcons.CheckCircle;

  return (
    <motion.div
      ref={ref}
      className={styles.featureItem}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.05,
      }}
    >
      {feature.image && (
        <div className={styles.imageWrap}>
          <img src={feature.image} alt={feature.title} className={styles.image} loading="lazy" />
          <div className={styles.iconBadge}>
            <Icon size={18} strokeWidth={2} />
          </div>
        </div>
      )}
      <div className={styles.featureContent}>
        <p className={styles.worryQuote}>{feature.worry}</p>
        <h3 className={styles.featureTitle}>{feature.title}</h3>
        <p className={styles.featureDesc}>{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className={`section ${styles.whyUs}`} aria-labelledby="why-heading">
      <div className="container">
        <div className={styles.inner}>
          <motion.div
            ref={headerRef}
            className={styles.header}
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">
              <span className="section-eyebrow">{whyChooseUs.eyebrow}</span>
            </div>
            <h2 id="why-heading" className={`section-heading ${styles.heading}`}>
              {whyChooseUs.heading.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {i === 1 ? (
                    <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
            <p className={styles.subheading}>{whyChooseUs.subheading}</p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {whyChooseUs.features.map((feature, index) => (
              <FeatureItem key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
