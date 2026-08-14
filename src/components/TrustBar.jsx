import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { trustBar } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './TrustBar.module.css';

function TrustItem({ value, label }) {
  return (
    <div className={styles.item} aria-label={`${value} ${label}`}>
      <span className={styles.value}>{value}</span>
      <span className={styles.sep} aria-hidden="true">·</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function TrustBar() {
  const prefersReduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const items = [...trustBar.items, ...trustBar.items]; // duplicate for seamless loop

  return (
    <motion.section
      ref={ref}
      className={styles.trustBar}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      aria-label="Company highlights"
    >
      <div className={styles.track} aria-live="off">
        <div
          className={styles.ticker}
          style={{
            animationPlayState: prefersReduced ? 'paused' : 'running',
          }}
        >
          {items.map((item, i) => (
            <TrustItem key={i} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
