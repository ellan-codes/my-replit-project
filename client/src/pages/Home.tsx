import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Packages } from "@/components/sections/Packages";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { About, Contact } from "@/components/sections/About";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Packages />
      <Gallery />
      <Testimonials />
      <About />
      <Contact />
      <footer className="bg-primary text-primary-foreground py-8 text-center">
        <p className="font-display font-bold">Prennedy Style Party Planning © 2025</p>
        <p className="text-sm opacity-80 mt-2">Made with sparkle in Encinitas, CA</p>
      </footer>
    </div>
  );
}
