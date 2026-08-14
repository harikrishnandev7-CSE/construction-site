# Aadhira BuildCraft — Premium Construction Website

A fully responsive, premium React marketing website for **Aadhira BuildCraft**, a residential construction company. Built as a client-facing sales demo showcasing the company's end-to-end home-building services.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Navigate to the project directory
cd "construction site"

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
  assets/
    images/          # Image assets
    icons/           # Icon assets
  components/        # Reusable UI components
    Navbar.jsx
    Hero.jsx
    TrustBar.jsx
    About.jsx
    Services.jsx
    ProcessTimeline.jsx
    DesignGallery.jsx
    WhyChooseUs.jsx
    Projects.jsx
    Testimonials.jsx
    ConsultationForm.jsx
    Footer.jsx
    ScrollToTop.jsx
    WhatsAppButton.jsx
  data/              # ALL editable business content lives here
    content.js       # Company info, nav, hero, about, stats, footer
    services.js      # 6 service items
    designs.js       # Home design gallery cards
    projects.js      # Featured projects
    testimonials.js  # Customer testimonials
  hooks/             # Custom React hooks
    usePrefersReducedMotion.js
    useCountUp.js
  pages/             # Route-level pages
    Home.jsx
    ProjectsPage.jsx
  styles/            # Global design system
    variables.css    # CSS custom properties (colors, fonts, spacing)
    globals.css      # Base resets and global styles
    animations.css   # Shared keyframe animations
  App.jsx            # Root component with React Router
  main.jsx           # App entry point
```

---

## ✏️ Editing Content

**All business content is stored in `src/data/` files** — no component code changes needed to update copy, images, phone numbers, or pricing.

| File | What to edit |
|------|-------------|
| `src/data/content.js` | Company name, tagline, hero text, trust bar, about copy, stats, why-choose-us, footer links, contact info |
| `src/data/services.js` | Service names, icons, and descriptions |
| `src/data/designs.js` | Home design gallery cards (images, specs, style labels) |
| `src/data/projects.js` | Featured projects (images, names, locations, areas) |
| `src/data/testimonials.js` | Customer testimonials (names, quotes, locations) |

### Changing the Phone Number / WhatsApp
In `src/data/content.js`, update `contact.phone` and `contact.whatsapp`. The WhatsApp button and `wa.me` links throughout the site will update automatically.

### Changing Colors / Fonts
Edit `src/styles/variables.css` — all colors, font families, and spacing are CSS custom properties.

---

## 🎨 Design System

**Color Palette:**
- Background: `#EDE8E2` (warm off-white)
- Surface: `#FFFFFF`
- Accent: `#503218` (warm brown)
- Text: `#242015`

**Typography:**
- Headlines: Fraunces (serif) — Google Fonts
- Body: Inter (sans-serif) — Google Fonts

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite | Build tool + dev server |
| React Router v6 | Client-side routing |
| Framer Motion | Animations and transitions |
| lucide-react | Icon library |
| CSS Modules | Component-scoped styles |

---

## 🌐 Routes

| Route | Page |
|-------|------|
| `/` | Home page (all sections) |
| `/projects` | Full projects gallery |

---

## ♿ Accessibility

- Semantic HTML5 landmarks
- Proper heading hierarchy (one `<h1>` per page)
- All images have descriptive `alt` text
- Keyboard-operable navigation, carousel, and modals
- Modal focus trapping + Escape key support
- Visible focus outlines on all interactive elements
- `prefers-reduced-motion` respected via `usePrefersReducedMotion` hook

---

*This is a demo website. All contact details, statistics, and testimonials are sample data for demonstration purposes.*
