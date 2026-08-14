import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { hero } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

function TrustPoint({ iconName, label }) {
  const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle;
  return (
    <div className={styles.trustPoint}>
      <Icon size={15} strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState('blueprint');
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
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleConsultClick = () => {
    const el = document.getElementById('consultation');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className={styles.hero}
      aria-label="Hero section"
    >
      {/* Background Image with Parallax & Architectural Overlay */}
      <motion.div
        className={styles.bgWrapper}
        style={prefersReduced ? {} : { y: parallaxY }}
      >
        <motion.div
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${hero.image})`,
          }}
          animate={prefersReduced ? {} : { scale: [1, 1.05] }}
          transition={
            prefersReduced
              ? {}
              : { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
        />
        <div className={styles.overlay} aria-hidden="true" />
        
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
        {/* Left Column: Headline & Slogan Only */}
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

        {/* Right Column: Interactive Project Planning Card & Floating Details */}
        <div className={styles.rightWrapper}>
          {/* Interactive Project Planning Card */}
          <motion.div
            className={styles.interactiveCard}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Card Header & Tabs */}
            <div className={styles.cardHeader}>
              <div className={styles.cardTitleWrap}>
                <span className={styles.livePulse} aria-hidden="true" />
                <span className={styles.cardMainTitle}>Project Blueprint & Live Specs</span>
              </div>
              <div className={styles.tabList} role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'blueprint'}
                  className={`${styles.tabBtn} ${activeTab === 'blueprint' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('blueprint')}
                >
                  Blueprint
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'materials'}
                  className={`${styles.tabBtn} ${activeTab === 'materials' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('materials')}
                >
                  Materials
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'build'}
                  className={`${styles.tabBtn} ${activeTab === 'build' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('build')}
                >
                  Build Status
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className={styles.tabBody}>
              <AnimatePresence mode="wait">
                {activeTab === 'blueprint' && (
                  <motion.div
                    key="blueprint"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={styles.blueprintView}
                  >
                    <div className={styles.svgFloorplanWrap}>
                      <svg viewBox="0 0 320 180" className={styles.floorplanSvg} aria-label="Sample 3BHK architectural floor plan diagram">
                        <rect x="10" y="10" width="300" height="160" fill="none" stroke="rgba(80, 50, 24, 0.3)" strokeWidth="2" strokeDasharray="4 2" />
                        {/* Living Room */}
                        <rect x="20" y="20" width="160" height="90" fill="rgba(80, 50, 24, 0.05)" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="100" y="60" textAnchor="middle" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--font-body)" fontWeight="600">LIVING ROOM</text>
                        <text x="100" y="75" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-body)">18' x 14'</text>
                        
                        {/* Master Bedroom */}
                        <rect x="190" y="20" width="110" height="90" fill="rgba(80, 50, 24, 0.08)" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="245" y="60" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">MASTER BED</text>
                        <text x="245" y="75" textAnchor="middle" fill="var(--color-text-muted)" fontSize="9" fontFamily="var(--font-body)">14' x 12'</text>
                        
                        {/* Kitchen & Foyer */}
                        <rect x="20" y="118" width="120" height="42" fill="rgba(80, 50, 24, 0.05)" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="80" y="142" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">MODULAR KITCHEN</text>

                        {/* Dining */}
                        <rect x="150" y="118" width="150" height="42" fill="rgba(80, 50, 24, 0.05)" stroke="var(--color-accent)" strokeWidth="1.5" />
                        <text x="225" y="142" textAnchor="middle" fill="var(--color-text-primary)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600">DINING & BALCONY</text>
                      </svg>
                    </div>
                    <div className={styles.specSummaryGrid}>
                      <div>
                        <span className={styles.specLabel}>PLOT SIZE</span>
                        <span className={styles.specVal}>2,400 sq ft</span>
                      </div>
                      <div>
                        <span className={styles.specLabel}>BUILT-UP</span>
                        <span className={styles.specVal}>3,250 sq ft</span>
                      </div>
                      <div>
                        <span className={styles.specLabel}>STRUCTURE</span>
                        <span className={styles.specVal}>G+2 Duplex</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'materials' && (
                  <motion.div
                    key="materials"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={styles.materialsView}
                  >
                    <div className={styles.materialGrid}>
                      <div className={styles.materialChip}>
                        <span className={styles.matSwatch} style={{ background: '#5C3A1E' }} />
                        <div className={styles.matMeta}>
                          <span className={styles.matTitle}>Teak Wood Trim</span>
                          <span className={styles.matGrade}>Grade A Burma Teak</span>
                        </div>
                      </div>
                      <div className={styles.materialChip}>
                        <span className={styles.matSwatch} style={{ background: '#4A5568' }} />
                        <div className={styles.matMeta}>
                          <span className={styles.matTitle}>FE-550 TMT Steel</span>
                          <span className={styles.matGrade}>Tata Tiscon / JSW</span>
                        </div>
                      </div>
                      <div className={styles.materialChip}>
                        <span className={styles.matSwatch} style={{ background: '#8C857B' }} />
                        <div className={styles.matMeta}>
                          <span className={styles.matTitle}>53 Grade Cement</span>
                          <span className={styles.matGrade}>UltraTech / ACC</span>
                        </div>
                      </div>
                      <div className={styles.materialChip}>
                        <span className={styles.matSwatch} style={{ background: '#E2E8F0' }} />
                        <div className={styles.matMeta}>
                          <span className={styles.matTitle}>Vitrified Tiles</span>
                          <span className={styles.matGrade}>Kajaria 4x2 Slabs</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.matGuaranteeNote}>
                      <em>"Selected for maximum structural durability, thermal comfort, and low maintenance."</em>
                    </p>
                  </motion.div>
                )}

                {activeTab === 'build' && (
                  <motion.div
                    key="build"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={styles.buildView}
                  >
                    <div className={styles.stageStatusHeader}>
                      <span className={styles.stageTitle}>Current Milestone: Plinth & Columns</span>
                      <span className={styles.stagePct}>45% Complete</span>
                    </div>
                    <div className={styles.progressBarWrap}>
                      <motion.div
                        className={styles.progressFillBar}
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <ul className={styles.timelineList}>
                      <li className={styles.timeDone}>✓ Plot Survey & Vastu Plan</li>
                      <li className={styles.timeDone}>✓ CMDA Plan Sanction Approval</li>
                      <li className={styles.timeActive}>● Foundation & Column Casting</li>
                      <li className={styles.timePending}>○ Brickwork & Lintel Slab</li>
                      <li className={styles.timePending}>○ Modular Finishing & Keys</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating Trust Card (140+ Completed Homes with avatars) */}
          <motion.div
            className={styles.floatingAvatarsCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className={styles.avatarGroup}>
              <span className={styles.avatarBubble}>RS</span>
              <span className={styles.avatarBubble}>PA</span>
              <span className={styles.avatarBubble}>SK</span>
              <span className={styles.avatarMore}>+500</span>
            </div>
            <div className={styles.avatarText}>
              <strong>500+ Homes Built</strong>
              <span>Across Chennai & Tamil Nadu</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
