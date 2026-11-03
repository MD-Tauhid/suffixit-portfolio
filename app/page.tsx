import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageEffects from "@/components/animations/PageEffects";
import JsonLd from "@/components/layout/JsonLd";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import FieldForce from "@/components/sections/FieldForce";
import Process from "@/components/sections/Process";
import Models from "@/components/sections/Models";
import Why from "@/components/sections/Why";
import Testimonials3DSection from "@/components/ui/3d-testimonials";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* 1. Hero Section */}
        <Hero />
        <Stats />

        {/* 2. Client Logos Section */}
        <Clients />

        {/* 3. Products Section ("Our Products") */}
        <Products />

        {/* 4. Solutions for Every Industry Section */}
        <Industries />


        {/* 5. Field Force Section */}
        <FieldForce />

        {/* 6. How We Work Section */}
        <Process />

        {/* 7. Ways to work with us (Four models, one trusted partner) */}
        <Models />

        {/* 8. Services Section */}
        <Services />


        {/* <Why /> - Commented out as requested */}

        {/* 9. 3D Customer Testimonials Section */}
        <Testimonials3DSection />

        {/* 10. Contact Section (With Direct Leadership Sales Team) */}
        <Contact />
      </main>
      <Footer />
      <a className="btn p fab" href="/contact">Get Free Consultancy</a>
      <PageEffects />
      <JsonLd />
    </>
  );
}
