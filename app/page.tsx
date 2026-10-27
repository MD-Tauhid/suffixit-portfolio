import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import PageEffects from "@/components/animations/PageEffects";
import JsonLd from "@/components/layout/JsonLd";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Why from "@/components/sections/Why";
import FieldForce from "@/components/sections/FieldForce";
import Products from "@/components/sections/Products";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import Models from "@/components/sections/Models";
import Tech from "@/components/sections/Tech";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Clients />
        <Why />
        <FieldForce />
        <Products />
        <Industries />
        <Services />
        <Models />
        <Tech />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a className="btn p fab" href="#contact">Get Free Consultancy</a>
      <PageEffects />
      <JsonLd />
    </>
  );
}
