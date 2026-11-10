import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageEffects from "@/components/animations/PageEffects";
import JsonLd from "@/components/layout/JsonLd";
import Hero, { VideoHero } from "@/components/sections/Hero";
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
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* 1. Hero Section:
            - Classic 4th-commit Hero active rakhle: <Hero />
            - Video Hero active korte chaile: <Hero /> comment kore <VideoHero /> un-comment korun
        */}
        {/* <Hero /> */}
        <VideoHero />
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
