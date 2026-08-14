import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import ConsultationForm from '../components/ConsultationForm';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { projects } from '../data/projects';
import styles from './ProjectsPage.module.css';

export default function ProjectsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Page Hero */}
        <section className={styles.pageHero} aria-label="Projects page header">
          <div className="container">
            <motion.div
              ref={headerRef}
              className={styles.pageHeroContent}
              initial={{ opacity: 0, y: 32 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-label">
                <span className="section-eyebrow">Portfolio</span>
              </div>
              <h1 className={`section-heading ${styles.pageTitle}`}>
                Every Home,{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
                  A Story
                </em>
              </h1>
              <p className={styles.pageSubtitle}>
                Browse our complete portfolio of completed homes — from compact urban residences to sprawling luxury villas. Every project is a unique collaboration between family and craft.
              </p>
            </motion.div>
          </div>
        </section>

        <Projects showAll projects={projects} />
        <ConsultationForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
