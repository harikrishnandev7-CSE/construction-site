import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { services } from '../data/services';
import styles from './Services.module.css';

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featuredService = services.find((s) => s.id === 'turnkey-construction') || services[0];
  const remainingServices = services.filter((s) => s.id !== featuredService.id);

  return (
    <section id="services" className={`section ${styles.services}`} aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <span className="section-eyebrow">What We Do</span>
          </div>
          <h2 id="services-heading" className="section-heading">
            End-to-End Services,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              One Single Partner
            </em>
          </h2>
          <p className={styles.subheading}>
            From your plot's initial survey to the day you receive your keys — we handle every stage so you never have to juggle multiple contractors.
          </p>
        </motion.div>

        {/* Asymmetric Editorial Grid */}
        <div className={styles.editorialGrid}>
          {/* Featured Service Card (Large) */}
          <motion.article
            className={styles.featuredCard}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.featuredImageWrap}>
              <img
                src={featuredService.image}
                alt={featuredService.title}
                className={styles.featuredImage}
                loading="lazy"
              />
              <div className={styles.featuredBadge}>FEATURED SERVICE • 01</div>
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredMeta}>
                <span className={styles.numTag}>01</span>
                <LucideIcons.Building2 size={24} className={styles.featuredIcon} />
              </div>
              <h3 className={styles.featuredTitle}>{featuredService.title}</h3>
              <p className={styles.featuredDesc}>{featuredService.fullDesc || featuredService.shortDesc}</p>
              
              <ul className={styles.featuredList}>
                <li>✓ Full architectural blueprinting & CMDA approval submission</li>
                <li>✓ Earthwork, RCC frame structure & brickwork execution</li>
                <li>✓ Weekly photo/video site reporting & milestone payments</li>
                <li>✓ Single dedicated project manager assigned to your site</li>
              </ul>
              
              <a href="#consultation" className={`btn btn-primary ${styles.featuredCta}`}>
                <span>Request Project Estimate</span>
                <LucideIcons.ArrowRight size={16} />
              </a>
            </div>
          </motion.article>

          {/* Grid of Remaining Services */}
          <div className={styles.secondaryGrid}>
            {remainingServices.map((service, index) => {
              const Icon = LucideIcons[service.icon] || LucideIcons.CheckCircle;
              const stepNum = String(index + 2).padStart(2, '0');

              return (
                <motion.article
                  key={service.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + index * 0.08,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className={styles.cardImageWrap}>
                    <img src={service.image} alt={service.title} className={styles.cardImage} loading="lazy" />
                    <span className={styles.cardNum}>{stepNum}</span>
                    <div className={styles.cardIconBadge}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.shortDesc}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardActionText}>Learn More</span>
                      <LucideIcons.ArrowRight size={15} className={styles.cardArrow} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
