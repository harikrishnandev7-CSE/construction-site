import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck, Package, Clock, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { hero } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { EASE_OUT_EXPO } from '../lib/motion';
import styles from './Hero.module.css';

const TRUST_ICONS = {
  BadgeCheck,
  Package,
  Clock,
  UserCheck,
};

export default function Hero() {
  const prefersReduced = usePrefersReducedMotion();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Handle video end or error
  const handleVideoEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause(); // Retain final frame on screen
    }
    setVideoEnded(true);
  }, []);

  // Sequence controller: resets on every mount (page load / refresh)
  useEffect(() => {
    setVideoEnded(false);

    if (prefersReduced) {
      setVideoEnded(true);
      return;
    }

    // Safety fallback: if video stalls or fails to trigger onEnded, reveal text after ~6.8s
    const fallbackTimer = setTimeout(() => {
      setVideoEnded(true);
    }, 6800);

    return () => clearTimeout(fallbackTimer);
  }, [prefersReduced]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const slideLeftItem = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Background Video (Single Play, Freezes on Last Frame) */}
      <motion.div
        className={styles.bgWrapper}
        style={prefersReduced ? {} : { y: parallaxY }}
      >
        <motion.div
          className={styles.videoWrapper}
          animate={prefersReduced ? {} : { scale: [1, 1.04] }}
          transition={
            prefersReduced
              ? {}
              : { duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
        >
          <video
            ref={videoRef}
            className={styles.bgVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onError={handleVideoEnded}
            onCanPlay={undefined}
          >
            {/* Cloudinary video with auto quality/format + raw MP4 fallback */}
            <source
              src="https://res.cloudinary.com/hkrsplqg/video/upload/q_auto,f_auto/v1786771034/WhatsApp_Video_2026-08-14_at_7.57.58_PM_mjfxs5.mp4"
              type="video/mp4"
            />
            <source
              src="https://res.cloudinary.com/hkrsplqg/video/upload/v1786771034/WhatsApp_Video_2026-08-14_at_7.57.58_PM_mjfxs5.mp4"
              type="video/mp4"
            />
            <img src={hero.image} alt="" className={styles.fallbackImage} />
          </video>
        </motion.div>

        {/* Overlays & Architectural Scrim */}
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.textBlockScrim} aria-hidden="true" />

        {/* Architectural Blueprint Line Grid */}
        <div className={styles.blueprintGrid} aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <circle cx="60" cy="60" r="1.5" fill="rgba(255, 255, 255, 0.12)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </motion.div>

      {/* Main Hero Content Container */}
      <div className={styles.content}>
        <motion.div
          className={styles.textBlock}
          variants={containerVariants}
          initial="hidden"
          animate={videoEnded ? 'visible' : 'hidden'}
        >
          {/* Eyebrow Label */}
          <motion.div variants={slideLeftItem} className={styles.eyebrow}>
            <span className={styles.eyebrowBadge}>
              <Sparkles size={12} className={styles.sparkleIcon} />
              Aadhira BuildCraft
            </span>
            <span className={styles.eyebrowDivider}>|</span>
            <span className={styles.eyebrowText}>Plot-to-Key Residential Construction</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={slideLeftItem} className={styles.headline}>
            <span className={styles.headlineLine}>Your Plot. Your Vision.</span>
            <span className={styles.headlineLine}>
              Our <em className={styles.headlineItalic}>Craftsmanship.</em>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={slideLeftItem} className={styles.subheadline}>
            {hero.subheadline}
          </motion.p>

          {/* Trust Points Chips */}
          <motion.div variants={slideLeftItem} className={styles.trustPointsGrid}>
            {hero.trustPoints.map((point) => {
              const IconComponent = TRUST_ICONS[point.icon] || BadgeCheck;
              return (
                <div key={point.label} className={styles.trustPointChip}>
                  <IconComponent size={14} className={styles.trustPointIcon} />
                  <span>{point.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={slideLeftItem} className={styles.ctaGroup}>
            <a
              href="#consultation"
              className={`btn btn-primary ${styles.primaryBtn}`}
            >
              <span>{hero.primaryCta}</span>
              <ArrowRight size={16} />
            </a>
            <Link
              to="/projects"
              className={`btn btn-outline ${styles.secondaryBtn}`}
            >
              <span>{hero.secondaryCta}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

