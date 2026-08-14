/**
 * AADHIRA BUILDCRAFT — PROJECTS DATA
 * Featured completed projects. Add or remove entries freely.
 * All images use Unsplash source URLs for demo purposes.
 */

export const projects = [
  {
    id: 'kaveri-residency',
    name: 'Kaveri Residency',
    location: 'Korattur, Chennai',
    homeType: 'Luxury Villa',
    builtArea: '3,800 sq ft',
    bedrooms: 5,
    completedYear: 2024,
    style: 'Modern Contemporary',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80',
    imageAlt: 'Kaveri Residency luxury villa exterior in Korattur Chennai',
    highlights: ['Home theatre', 'Private pool', 'Solar-ready', 'Landscaped garden'],
    featured: true,
  },
  {
    id: 'nandini-duplex',
    name: 'Nandini Duplex',
    location: 'Anna Nagar, Chennai',
    homeType: 'Contemporary Duplex',
    builtArea: '2,100 sq ft',
    bedrooms: 4,
    completedYear: 2024,
    style: 'Indo-Modern',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    imageAlt: 'Nandini Duplex contemporary home exterior in Anna Nagar Chennai',
    highlights: ['Terrace garden', 'Modular kitchen', 'Home automation', 'Guest suite'],
    featured: true,
  },
  {
    id: 'maruthi-homes',
    name: 'Maruthi Home',
    location: 'Tambaram, Chennai',
    homeType: 'Modern 3BHK',
    builtArea: '1,520 sq ft',
    bedrooms: 3,
    completedYear: 2023,
    style: 'Contemporary',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80',
    imageAlt: 'Maruthi Home modern 3BHK exterior in Tambaram Chennai',
    highlights: ['Open-plan living', 'Walk-in wardrobe', 'Double-height entrance'],
    featured: true,
  },
  {
    id: 'surya-villa',
    name: 'Surya Villa',
    location: 'Porur, Chennai',
    homeType: 'Luxury Villa',
    builtArea: '4,200 sq ft',
    bedrooms: 5,
    completedYear: 2023,
    style: 'Premium Contemporary',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80',
    imageAlt: 'Surya Villa premium contemporary luxury home exterior in Porur Chennai',
    highlights: ['Private pool', 'Home theatre', 'Smart home', 'Gym room'],
    featured: false,
  },
  {
    id: 'priya-compact',
    name: 'Priya Compact Home',
    location: 'Pallavaram, Chennai',
    homeType: 'Compact 2BHK',
    builtArea: '920 sq ft',
    bedrooms: 2,
    completedYear: 2023,
    style: 'Modern Minimal',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80',
    imageAlt: 'Priya Compact Home minimal 2BHK exterior in Pallavaram Chennai',
    highlights: ['Maximised storage', 'Natural light design', 'Compact but complete'],
    featured: false,
  },
  {
    id: 'rajan-abode',
    name: 'Rajan Abode',
    location: 'Velachery, Chennai',
    homeType: 'Modern 3BHK',
    builtArea: '1,680 sq ft',
    bedrooms: 3,
    completedYear: 2022,
    style: 'Contemporary',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80',
    imageAlt: 'Rajan Abode modern 3BHK home exterior in Velachery Chennai',
    highlights: ['Rooftop terrace', 'Feature staircase', 'Modular interiors'],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
