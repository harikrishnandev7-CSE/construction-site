import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Loader2, X, Send } from 'lucide-react';
import { contact } from '../data/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { EASE_OUT_EXPO } from '../lib/motion';
import styles from './ConsultationForm.module.css';

const VIDEO_URL =
  'https://res.cloudinary.com/hkrsplqg/video/upload/q_auto,f_auto/v1786772884/WhatsApp_Video_2026-08-15_at_11.16.00_AM_s6nfsg.mp4';
const POSTER_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';

const BUDGET_OPTIONS = [
  'Under ₹30 Lakhs',
  '₹30 – 60 Lakhs',
  '₹60 Lakhs – 1 Crore',
  '₹1 – 1.5 Crore',
  '₹1.5 Crore+',
];

const HOME_TYPES = [
  'Compact 2BHK',
  'Standard 3BHK',
  'Contemporary Duplex',
  'Luxury Villa',
  'Renovation / Extension',
  'Not Sure Yet',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  plotLocation: '',
  plotSize: '',
  budget: '',
  homeType: '',
  message: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.phone.trim()) {
    errors.phone = 'Please enter your mobile number.';
  } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.plotLocation.trim()) errors.plotLocation = 'Please enter your plot location.';
  if (!form.budget) errors.budget = 'Please select an estimated budget.';
  if (!form.homeType) errors.homeType = 'Please select your preferred home type.';
  return errors;
}

function SuccessState({ onClose }) {
  return (
    <motion.div
      className={styles.success}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      <div className={styles.successIcon} aria-hidden="true">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 250, damping: 18 }}
        >
          <CheckCircle size={56} strokeWidth={1.5} />
        </motion.div>
      </div>
      <h3 className={styles.successTitle}>We'll be in touch soon!</h3>
      <p className={styles.successText}>
        Thank you for reaching out. Our team will contact you within 24 hours to schedule a free consultation visit to your plot.
      </p>
      <button className={`btn btn-primary ${styles.closeSuccessBtn}`} onClick={onClose}>
        Done
      </button>
    </motion.div>
  );
}

export default function ConsultationForm() {
  const prefersReduced = usePrefersReducedMotion();
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const revealTimerRef = useRef(null);
  const modalCloseRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  // Auto-play video on scroll into view & trigger 1.8s timed reveal
  useEffect(() => {
    if (prefersReduced) {
      setHasRevealed(true);
      return;
    }

    const target = wrapperRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            if (!hasRevealed && !revealTimerRef.current) {
              revealTimerRef.current = setTimeout(() => {
                setHasRevealed(true);
              }, 1800);
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, [prefersReduced, hasRevealed]);

  // Modal keyboard listener & body scroll lock
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1600);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (status === 'success') {
      setStatus('idle');
      setForm(initialForm);
      setTouched({});
      setErrors({});
    }
  };

  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  // Staggered reveal animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <section id="consultation" className={`section ${styles.formSection}`} aria-labelledby="consultation-heading">
      <div className="container">
        {/* Main Full-Width Video Panel */}
        <div ref={wrapperRef} className={styles.ctaWrapper}>
          {!prefersReduced && (
            <>
              <video
                ref={videoRef}
                className={styles.bgVideo}
                src={VIDEO_URL}
                poster={POSTER_IMAGE}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
              <div className={styles.bgOverlay} aria-hidden="true" />
            </>
          )}

          <motion.div
            className={styles.contentBox}
            variants={contentVariants}
            initial={prefersReduced ? 'visible' : 'hidden'}
            animate={hasRevealed || prefersReduced ? 'visible' : 'hidden'}
          >
            <div className="section-label">
              <span className="section-eyebrow" style={{ color: '#FFB356', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                Get In Touch
              </span>
            </div>

            <h2 id="consultation-heading" className={`section-heading ${styles.heading}`}>
              Start Your{' '}
              <em className={styles.headingItalic}>
                Home Journey
              </em>
            </h2>

            <p className={styles.infoDesc}>
              Ready to turn your plot into your dream home? Fill in a few details and our engineering team will visit your site for a free consultation.
            </p>

            {/* Contact Details Chips */}
            <div className={styles.contactDetails}>
              <a href={`tel:${contact.phoneRaw}`} className={styles.contactItem}>
                <Phone size={15} aria-hidden="true" />
                <span>{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className={styles.contactItem}>
                <Mail size={15} aria-hidden="true" />
                <span>{contact.email}</span>
              </a>
              <div className={styles.contactItem}>
                <MapPin size={15} aria-hidden="true" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className={styles.ctaActions}>
              <button
                type="button"
                className={`btn btn-primary ${styles.openModalBtn}`}
                onClick={() => setIsModalOpen(true)}
              >
                <Send size={18} aria-hidden="true" />
                <span>Request Free Consultation</span>
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-outline ${styles.whatsappBtn}`}
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pop-Up Consultation Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseModal}
            role="presentation"
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-form-heading"
            >
              <button
                ref={modalCloseRef}
                className={styles.modalClose}
                onClick={handleCloseModal}
                aria-label="Close consultation modal"
              >
                <X size={20} />
              </button>

              {status === 'success' ? (
                <SuccessState onClose={handleCloseModal} />
              ) : (
                <div className={styles.modalFormWrapper}>
                  <div className={styles.modalHeader}>
                    <h3 id="modal-form-heading" className={styles.modalTitle}>
                      Get Free Consultation
                    </h3>
                    <p className={styles.modalSub}>
                      Schedule a free plot visit and itemized estimate.
                    </p>
                  </div>

                  <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Free consultation request form"
                  >
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label htmlFor="name" className={styles.label}>
                          Full Name <span className={styles.req} aria-label="required">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          aria-required="true"
                          aria-invalid={!!(errors.name && touched.name)}
                          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                        />
                        {errors.name && touched.name && (
                          <span id="name-error" className={styles.errorMsg} role="alert">{errors.name}</span>
                        )}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="phone" className={styles.label}>
                          Mobile Number <span className={styles.req} aria-label="required">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''}`}
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="10-digit mobile number"
                          aria-required="true"
                          aria-invalid={!!(errors.phone && touched.phone)}
                          aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && touched.phone && (
                          <span id="phone-error" className={styles.errorMsg} role="alert">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address <span className={styles.req} aria-label="required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@email.com"
                        aria-required="true"
                        aria-invalid={!!(errors.email && touched.email)}
                        aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      />
                      {errors.email && touched.email && (
                        <span id="email-error" className={styles.errorMsg} role="alert">{errors.email}</span>
                      )}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label htmlFor="plotLocation" className={styles.label}>
                          Plot Location <span className={styles.req} aria-label="required">*</span>
                        </label>
                        <input
                          id="plotLocation"
                          name="plotLocation"
                          type="text"
                          className={`${styles.input} ${errors.plotLocation && touched.plotLocation ? styles.inputError : ''}`}
                          value={form.plotLocation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Area / City"
                          aria-required="true"
                          aria-invalid={!!(errors.plotLocation && touched.plotLocation)}
                          aria-describedby={errors.plotLocation && touched.plotLocation ? 'plotLocation-error' : undefined}
                        />
                        {errors.plotLocation && touched.plotLocation && (
                          <span id="plotLocation-error" className={styles.errorMsg} role="alert">{errors.plotLocation}</span>
                        )}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="plotSize" className={styles.label}>
                          Plot Size (sq ft)
                        </label>
                        <input
                          id="plotSize"
                          name="plotSize"
                          type="text"
                          className={styles.input}
                          value={form.plotSize}
                          onChange={handleChange}
                          placeholder="e.g. 1500 sq ft"
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label htmlFor="budget" className={styles.label}>
                          Estimated Budget <span className={styles.req} aria-label="required">*</span>
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          className={`${styles.select} ${errors.budget && touched.budget ? styles.inputError : ''}`}
                          value={form.budget}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-required="true"
                          aria-invalid={!!(errors.budget && touched.budget)}
                          aria-describedby={errors.budget && touched.budget ? 'budget-error' : undefined}
                        >
                          <option value="">Select range</option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {errors.budget && touched.budget && (
                          <span id="budget-error" className={styles.errorMsg} role="alert">{errors.budget}</span>
                        )}
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="homeType" className={styles.label}>
                          Type of Home <span className={styles.req} aria-label="required">*</span>
                        </label>
                        <select
                          id="homeType"
                          name="homeType"
                          className={`${styles.select} ${errors.homeType && touched.homeType ? styles.inputError : ''}`}
                          value={form.homeType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-required="true"
                          aria-invalid={!!(errors.homeType && touched.homeType)}
                          aria-describedby={errors.homeType && touched.homeType ? 'homeType-error' : undefined}
                        >
                          <option value="">Select type</option>
                          {HOME_TYPES.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {errors.homeType && touched.homeType && (
                          <span id="homeType-error" className={styles.errorMsg} role="alert">{errors.homeType}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="message" className={styles.label}>
                        Any specific requirements or questions?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className={styles.textarea}
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Tell us about your vision, timeline, or any concerns..."
                      />
                    </div>

                    <button
                      type="submit"
                      className={`btn btn-primary ${styles.submitBtn}`}
                      disabled={status === 'submitting'}
                      aria-disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{ display: 'flex' }}
                          >
                            <Loader2 size={18} aria-hidden="true" />
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        'Request Free Consultation'
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

