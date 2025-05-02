import FactureBanner from "@/components/layout/landig-page/Banner";
import Faq from "@/components/layout/landig-page/Faq";
import Feature from "@/components/layout/landig-page/Featured";
import Hero from "@/components/layout/landig-page/Hero";
import TestimonialCarousel from "@/components/layout/landig-page/Testimonials";
import Navbar from "@/components/layout/navigation/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <Feature />
        <FactureBanner/>
        <TestimonialCarousel />
        <Faq />
      </main>
    </>
  );
}
