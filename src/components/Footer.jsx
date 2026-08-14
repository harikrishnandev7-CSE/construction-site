import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, MessageSquare, Video, Briefcase } from 'lucide-react';
import { company, contact, footerNav } from '../data/content';
import styles from './Footer.module.css';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Logo light={true} />
            </div>
            <p className={styles.tagline}>{company.tagline}</p>
            <p className={styles.mission}>{company.mission}</p>

            <div className={styles.social} aria-label="Social media links">
              <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                <Share2 size={18} />
              </a>
              <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                <MessageSquare size={18} />
              </a>
              <a href={contact.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={styles.socialLink}>
                <Video size={18} />
              </a>
              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
                <Briefcase size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.colHeading}>Company</h3>
            <ul className={styles.linkList}>
              {footerNav.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className={styles.footerLink}>{link.label}</Link>
                  ) : (
                    <a href={link.href} className={styles.footerLink}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.colHeading}>Services</h3>
            <ul className={styles.linkList}>
              {footerNav.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.contactCol}>
            <h3 className={styles.colHeading}>Contact</h3>
            <div className={styles.contactList}>
              <a href={`tel:${contact.phoneRaw}`} className={styles.contactItem}>
                <Phone size={15} aria-hidden="true" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className={styles.contactItem}>
                <Mail size={15} aria-hidden="true" />
                {contact.email}
              </a>
              <div className={styles.contactItem}>
                <MapPin size={15} aria-hidden="true" />
                {contact.address}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p className={styles.demoNote}>
            This is a demo website. All details are sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
