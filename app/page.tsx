import Navbar from "@/components/nav/Navbar";
import About from "@/sections/About";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Footer from "@/sections/Footer";
import GitHub from "@/sections/GitHub";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Education />
        <GitHub />
        <Footer />
      </main>
    </div>
  );
}
