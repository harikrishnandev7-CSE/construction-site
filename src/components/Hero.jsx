import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

export default function Hero() {
  const prefersReduced = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Looping Background Video (No poster attribute to avoid initial image flash) */}
      <motion.div
        className={styles.bgWrapper}
        style={prefersReduced ? {} : { y: parallaxY }}
      >
        <motion.div
          className={styles.videoWrapper}
          animate={prefersReduced ? {} : { scale: [1, 1.05] }}
          transition={
            prefersReduced
              ? {}
              : { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
        >
          <video
            className={styles.bgVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://res.cloudinary.com/k9uaasxi/video/upload/v1786700108/12067680_1920_1080_60fps.mp4"
              type="video/mp4"
            />
            <img src={hero.image} alt="" className={styles.fallbackImage} />
          </video>
        </motion.div>
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.textBlockScrim} aria-hidden="true" />
        
        {/* Subtle Architectural Blueprint Line Grid Background */}
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

      {/* Main Hero Container */}
      <div className={styles.content}>
        {/* Headline & Slogan Block */}
        <motion.div
          className={styles.textBlock}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className={styles.headline}>
            <span className={styles.headlineLine}>Your Plot. Your Vision.</span>
            <span className={styles.headlineLine}>
              Our <em className={styles.headlineItalic}>Craftsmanship.</em>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.subheadline}>
            {hero.subheadline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
