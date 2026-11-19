import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageEffects from "@/components/animations/PageEffects";
import JsonLd from "@/components/layout/JsonLd";
import Hero, { VideoHero, SpatialHero, EditorialHero } from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import FieldForce from "@/components/sections/FieldForce";
import Process from "@/components/sections/Process";
import Models from "@/components/sections/Models";
// import Why from "@/components/sections/Why";
import Tech from "@/components/sections/Tech";
// import Testimonials3DSection from "@/components/ui/3d-testimonials";
import { StaggerTestimonialsSection } from "@/components/ui/stagger-testimonials";
// import ConnectedStoriesSection from "@/components/sections/ConnectedStories";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* ═════════════════════════════════════════════════════════════════
            HERO SECTION VARIANTS (যেকোনো একটির কমেন্ট উঠিয়ে রানিং করুন)
            ═════════════════════════════════════════════════════════════════
            Variant 1 (New 3D Spatial Orbital Cards): <SpatialHero />  <-- Active
            Variant 2 (Flagship Liquid Glass S-Logo & Cockpit): <Hero />
            Variant 3 (60fps Scroll-Locked Video Hero): <VideoHero />
            Variant 4 (Modern Editorial Grid Hero): <EditorialHero />
        */}
        {/* <SpatialHero /> */}
        <Hero />
        {/* <VideoHero /> */}
        {/* <EditorialHero /> */}
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

        {/* 9. Technology We Use (Modern Stack Dual Marquee) */}
        <Tech />

        {/* <Why /> - Commented out as requested */}

        {/* Previous 3D Customer Testimonials Section - Commented out as requested */}
        {/* <Testimonials3DSection /> */}

        {/* 10. Stagger Testimonials Interactive Carousel Section */}
        <StaggerTestimonialsSection />

        {/* 11. Contact Section (With Direct Leadership Sales Team) */}
        <Contact />
      </main>
      <Footer />
      <a className="btn p fab" href="/contact">Get Free Consultancy</a>
      <PageEffects />
      <JsonLd />
    </>
  );
}
