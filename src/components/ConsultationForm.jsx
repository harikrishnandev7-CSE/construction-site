import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { contact } from '../data/content';
import styles from './ConsultationForm.module.css';

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

function SuccessState() {
  return (
    <motion.div
      className={styles.success}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
      <p className={styles.successNote}>
        <em>This is a demo submission. No data was actually sent.</em>
      </p>
    </motion.div>
  );
}

export default function ConsultationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

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
    setTimeout(() => setStatus('success'), 1800);
  };

  const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <section id="consultation" className={`section ${styles.formSection}`} aria-labelledby="consultation-heading">
      <div className="container">
        <div className={styles.ctaWrapper}>
          <div className={styles.grid}>
            {/* Left: Info */}
            <motion.div
              className={styles.infoCol}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-label">
                <span className="section-eyebrow" style={{ color: '#E8D3C0' }}>Get In Touch</span>
              </div>
              <h2 id="consultation-heading" className={`section-heading ${styles.heading}`}>
                Start Your{' '}
                <em style={{ fontStyle: 'italic', color: '#E8D3C0' }}>
                  Home Journey
                </em>
              </h2>
              <p className={styles.infoDesc}>
                Fill in a few details and our team will reach out within 24 hours to schedule a free site visit and consultation — no commitment required.
              </p>

              <div className={styles.contactDetails}>
                <a href={`tel:${contact.phoneRaw}`} className={styles.contactItem}>
                  <Phone size={18} aria-hidden="true" />
                  <div>
                    <span className={styles.contactLabel}>Call Us</span>
                    <span className={styles.contactValue}>{contact.phone}</span>
                  </div>
                </a>
                <a href={`mailto:${contact.email}`} className={styles.contactItem}>
                  <Mail size={18} aria-hidden="true" />
                  <div>
                    <span className={styles.contactLabel}>Email</span>
                    <span className={styles.contactValue}>{contact.email}</span>
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <MapPin size={18} aria-hidden="true" />
                  <div>
                    <span className={styles.contactLabel}>Office</span>
                    <span className={styles.contactValue}>{contact.address}</span>
                  </div>
                </div>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.whatsappBtn}`}
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              className={styles.formCol}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className={styles.formCard}>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <SuccessState key="success" />
                  ) : (
                    <form
                      key="form"
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
                          rows={4}
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
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
