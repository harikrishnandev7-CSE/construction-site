import React from 'react';
import styles from './Logo.module.css';

/**
 * Architectural interlocking hairline 'A' monogram logo.
 * Precision 1.5px stroke SVG emblem with optional signature gold rule on large variant.
 */
export default function Logo({ size = 'medium', light = false }) {
  return (
    <div className={`${styles.logoWrap} ${styles[size]} ${light ? styles.light : ''}`}>
      <svg
        className={styles.mark}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Interlocking hairline 'A' monogram with architectural apex */}
        <path
          d="M16 3L3 27H9.5L16 14L22.5 27H29L16 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8.5 19H23.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="9.5" r="1" fill="currentColor" />
      </svg>
      
      <div className={styles.brandText}>
        <span className={styles.name}>AADHIRA</span>
        <span className={styles.sub}>BUILDCRAFT</span>
        {size === 'large' && <span className={styles.accentRule} aria-hidden="true" />}
      </div>
    </div>
  );
}
