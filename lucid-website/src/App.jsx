import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import AIAvatars from "./components/AIAvatars";
import Blockchain from "./components/Blockchain";
import Milestones from "./components/Milestones";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <AIAvatars />
      <Blockchain />
      <Milestones />
      <Testimonials />
      <CTA />
    </div>
  );
}
