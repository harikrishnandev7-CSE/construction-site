import { MessageCircle } from 'lucide-react';
import { contact } from '../data/content';
import styles from './WhatsAppButton.module.css';

/**
 * WhatsAppButton — Fixed floating button, always visible.
 * Opens WhatsApp with a prefilled message.
 */
export default function WhatsAppButton() {
  const href = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Contact Aadhira BuildCraft on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={1.8} aria-hidden="true" />
      <span className={styles.tooltip} aria-hidden="true">Chat with us</span>
    </a>
  );
}
