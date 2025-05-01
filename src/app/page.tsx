import Feature from "@/components/layout/landig-page/Featured";
import Hero from "@/components/layout/landig-page/Hero";
import TestimonialCarousel from "@/components/layout/landig-page/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero/>
      <Feature />
      <TestimonialCarousel/>
      {/* < FAQ/> */}
    </main>
  );
}
