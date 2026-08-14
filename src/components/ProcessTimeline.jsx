import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ProcessTimeline.module.css';

const steps = [
  {
    number: '01',
    title: 'Plot Visit & Requirement Discussion',
    description:
      'Our team visits your plot, discusses your lifestyle, budget, and vision — and provides honest guidance on what\'s achievable.',
    icon: '📍',
  },
  {
    number: '02',
    title: 'Custom Plan, 3D Design & Quotation',
    description:
      'Architects create a bespoke floor plan and photorealistic 3D renders. You receive a detailed, transparent quotation.',
    icon: '📐',
  },
  {
    number: '03',
    title: 'Approval & Project Scheduling',
    description:
      'We handle all local authority approvals and create a milestone-based construction schedule with payment clarity.',
    icon: '✅',
  },
  {
    number: '04',
    title: 'Construction with Stage-wise Updates',
    description:
      'Construction begins with your dedicated engineer on site. Receive weekly photo progress reports throughout.',
    icon: '🏗️',
  },
  {
    number: '05',
    title: 'Quality Check & Key Handover',
    description:
      'Final quality inspection across all systems. Any snag-list items resolved before your key handover ceremony.',
    icon: '🔑',
  },
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="process" className={`section ${styles.process}`} aria-labelledby="process-heading">
      <div className="container">
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">How It Works</span>
          </div>
          <h2 id="process-heading" className="section-heading">
            Your Home, Step by Step
          </h2>
          <p className={styles.subheading}>
            A clear, predictable process from first meeting to final key — no surprises, no confusion.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div ref={ref} className={styles.desktopTimeline} aria-label="Construction process steps">
          {/* Connecting line */}
          <div className={styles.lineTrack} aria-hidden="true">
            <motion.div
              className={styles.lineFill}
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.15,
              }}
            >
              <div className={styles.stepDotWrap} aria-hidden="true">
                <motion.div
                  className={styles.stepDot}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2 + i * 0.15,
                  }}
                >
                  <span className={styles.stepNumber}>{step.number}</span>
                </motion.div>
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className={styles.mobileTimeline} aria-label="Construction process steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className={styles.mobileStep}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05 + i * 0.1,
              }}
              ref={i === 0 ? ref : null}
            >
              <div className={styles.mobileStepLeft}>
                <div className={styles.mobileDot} aria-hidden="true">
                  <span className={styles.mobileDotNumber}>{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <motion.div
                    className={styles.mobileConnector}
                    initial={{ height: 0 }}
                    animate={inView ? { height: '100%' } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.1,
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className={styles.mobileStepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
