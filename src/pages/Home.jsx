import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import About from '../components/About';
import Services from '../components/Services';
import ConstructionTimelapse from '../components/ConstructionTimelapse';
import DesignGallery from '../components/DesignGallery';
import WhyChooseUs from '../components/WhyChooseUs';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import ConsultationForm from '../components/ConsultationForm';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <ConstructionTimelapse />
        <DesignGallery />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <ConsultationForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
