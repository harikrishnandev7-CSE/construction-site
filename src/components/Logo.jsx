import React from 'react';
import styles from './Logo.module.css';

/**
 * Sleek, minimal architectural logo combining letter 'A' with a refined roofline emblem.
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
        {/* Minimalist Architectural 'A' Apex */}
        <path
          d="M16 4L4 26H9.5L16 13L22.5 26H28L16 4Z"
          fill="currentColor"
        />
        {/* Cantilever Horizontal Beam */}
        <rect x="7" y="19" width="18" height="2.5" fill="currentColor" rx="1" />
      </svg>
      <div className={styles.brandText}>
        <span className={styles.name}>AADHIRA</span>
        <span className={styles.sub}>BUILDCRAFT</span>
      </div>
    </div>
  );
}
