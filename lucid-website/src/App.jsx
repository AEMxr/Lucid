import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Milestones from "./components/Milestones";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import TechnologySection from "./components/TechnologySection";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TechnologySection />
      <Testimonials />
      <CTA />
    </div>
  );
}
