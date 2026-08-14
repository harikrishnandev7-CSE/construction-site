/**
 * AADHIRA BUILDCRAFT — MAIN CONTENT DATA
 * Edit this file to update company info, navigation, hero text,
 * trust bar, about section, stats, why-choose-us, and footer.
 * No component code changes are needed.
 */

export const company = {
  name: 'Aadhira BuildCraft',
  tagline: 'From Plot to Perfect Home.',
  shortDesc:
    'End-to-end residential construction — from plot consultation to key handover.',
  mission:
    'We believe every family deserves a home that reflects their life story. Aadhira BuildCraft removes the stress of building, handling every step with transparency, expertise, and genuine care.',
  founded: 2010,
  logo: 'Aadhira BuildCraft',
};

export const contact = {
  /** Update these with real client details */
  phone: '+91 98765 43210',
  phoneRaw: '+919876543210',
  whatsapp: '+919876543210',
  whatsappMessage:
    "Hello! I'm interested in building my home with Aadhira BuildCraft. Please get in touch.",
  email: 'hello@aadhirabuildcraft.com',
  address: '42, Anna Nagar East, Chennai – 600 040, Tamil Nadu',
  mapUrl: 'https://maps.google.com',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
};

export const nav = {
  links: [
    { label: 'Home', href: '/', type: 'route' },
    { label: 'Services', href: '#services', type: 'scroll' },
    { label: 'Timelapse', href: '#timelapse', type: 'scroll' },
    { label: 'Designs', href: '#designs', type: 'scroll' },
    { label: 'Projects', href: '/projects', type: 'route' },
    { label: 'Contact', href: '#consultation', type: 'scroll' },
  ],
  ctaLabel: 'Get Free Consultation',
  ctaHref: '#consultation',
};

export const hero = {
  headline: 'Your Plot.\nYour Vision.\nOur Craftsmanship.',
  subheadline: 'Ungal Plot-la, Ungal Budget-la, Dream Home Build Panrom.',
  primaryCta: 'Get Free Consultation',
  secondaryCta: 'View Projects',
  image:
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1800&q=80',
  floatingPanel: {
    label: 'Design in Progress',
    detail1: { label: 'Plot Area', value: '2,400 sq ft' },
    detail2: { label: 'Est. Timeline', value: '14 Months' },
    detail3: { label: 'Style', value: 'Contemporary' },
    status: 'Planning Phase',
  },
  trustPoints: [
    { icon: 'BadgeCheck', label: 'Transparent Pricing' },
    { icon: 'Package', label: 'Quality Materials' },
    { icon: 'Clock', label: 'On-Time Delivery' },
    { icon: 'UserCheck', label: 'Dedicated Project Manager' },
  ],
};

export const trustBar = {
  items: [
    { value: '500+', label: 'Happy Families' },
    { value: '15+', label: 'Years Combined Expertise' },
    { value: '100%', label: 'Transparent Costing' },
    { value: '12+', label: 'Cities Served' },
    { value: '50+', label: 'Expert Engineers On-Site' },
    { value: '98%', label: 'Client Satisfaction Rate' },
  ],
};

export const about = {
  eyebrow: 'Our Story',
  heading: 'Built on Trust,\nDelivered with Craft.',
  paragraphs: [
    "Aadhira BuildCraft was founded on a simple belief: building a home should be one of life's most joyful experiences — not its most stressful. We saw families struggle with unreliable contractors, opaque pricing, and construction that dragged on for years.",
    'So we built a different kind of company. One that acts as a single, accountable partner from the moment you buy your plot to the day you receive your keys. Our team of architects, structural engineers, interior designers, and project managers work in sync — so nothing falls through the cracks.',
    'Every home we build is designed for the family that will live in it: thoughtful spaces, durable materials, and a process transparent enough that you always know exactly where your investment stands.',
  ],
  image:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
  imageAlt:
    'Elegant modern villa exterior with lush landscaping built by Aadhira BuildCraft',
  stats: [
    { value: 500, suffix: '+', label: 'Homes Designed' },
    { value: 15, suffix: '+', label: 'Years of Expertise' },
    { value: 12, suffix: '+', label: 'Cities Served' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
  ],
};

export const whyChooseUs = {
  eyebrow: 'Why Aadhira',
  heading: 'The Aadhira\nDifference',
  subheading:
    'We\'ve heard every homebuilding worry. Here\'s how we address each one.',
  features: [
    {
      icon: 'Eye',
      title: 'Complete Transparency',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      description:
        'Itemised quotations, stage-wise payment schedules, and no hidden charges — ever. You see every rupee\'s allocation before it moves.',
      worry: '"Will I be hit with surprise costs?"',
    },
    {
      icon: 'Medal',
      title: 'Brand-Grade Materials Only',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
      description:
        'We work exclusively with certified, top-tier material brands. Our procurement team selects, sources, and verifies every input.',
      worry: '"Will they use cheap materials when I\'m not looking?"',
    },
    {
      icon: 'HardHat',
      title: 'Dedicated On-Site Engineer',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      description:
        'Your project has a named engineer who is physically present on site and reachable on WhatsApp — throughout the build.',
      worry: '"Who do I actually call when something goes wrong?"',
    },
    {
      icon: 'BarChart2',
      title: 'Weekly Progress Reports',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
      description:
        'Receive a structured update with photos and completion percentages every week — so you\'re never in the dark about your home.',
      worry: '"How will I know if construction is on track?"',
    },
    {
      icon: 'ShieldCheck',
      title: 'Multi-Stage Quality Checks',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
      description:
        'Independent quality inspections at every structural milestone — not just at handover. Problems caught early, never hidden.',
      worry: '"How do I know the quality is really good?"',
    },
    {
      icon: 'HeartHandshake',
      title: 'Post-Handover Support',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
      description:
        'Our relationship doesn\'t end at key handover. We provide a structured warranty period and rapid response for any post-move issues.',
      worry: '"What happens if something breaks after I move in?"',
    },
  ],
};

export const footerNav = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'How It Works', href: '#process' },
    { label: 'Why Aadhira', href: '#why-us' },
    { label: 'Projects', href: '/projects' },
  ],
  services: [
    { label: 'Architectural Planning', href: '#services' },
    { label: '3D Elevation & Design', href: '#services' },
    { label: 'Approval Support', href: '#services' },
    { label: 'Turnkey Construction', href: '#services' },
    { label: 'Modular Interiors', href: '#services' },
    { label: 'Renovation & Extension', href: '#services' },
  ],
};
