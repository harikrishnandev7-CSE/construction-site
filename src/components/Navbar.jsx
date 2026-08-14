import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, company } from '../data/content';
import styles from './Navbar.module.css';

import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // On non-home pages, always use the solid/scrolled navbar style
  const isScrolled = !isHome || scrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((link) => {
    setMobileOpen(false);
    if (link.type === 'scroll') {
      // Small delay to allow mobile menu to close first
      setTimeout(() => {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, []);

  const handleCtaClick = useCallback(() => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById('consultation');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }, []);

  return (
    <>
      <motion.header
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink} aria-label="Aadhira BuildCraft — Home">
            <Logo light={!isScrolled} />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList} role="list">
              {nav.links.map((link) => (
                <li key={link.label}>
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className={`${styles.navLink} ${location.pathname === link.href ? styles.active : ''}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      className={styles.navLink}
                      onClick={() => handleNavClick(link)}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className={styles.actions}>
            <button
              className={`btn btn-primary btn-sm ${styles.ctaBtn}`}
              onClick={handleCtaClick}
            >
              {nav.ctaLabel}
            </button>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.77, 0, 0.18, 1] }}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
          >
            <div className={styles.mobileMenuInner}>
              <div className={styles.mobileMenuLogo}>
                <span className={styles.logoMark}>A</span>
                <span className={styles.logoText}>{company.name}</span>
              </div>
              <nav aria-label="Mobile navigation links">
                <ul className={styles.mobileNavList} role="list">
                  {nav.links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                    >
                      {link.type === 'route' ? (
                        <Link
                          to={link.href}
                          className={styles.mobileNavLink}
                          onClick={() => handleNavClick(link)}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <button
                          className={styles.mobileNavLink}
                          onClick={() => handleNavClick(link)}
                        >
                          {link.label}
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div
                className={styles.mobileCta}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
              >
                <button
                  className={`btn btn-primary ${styles.mobileCtaBtn}`}
                  onClick={handleCtaClick}
                >
                  {nav.ctaLabel}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
