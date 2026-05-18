import Navbar from "@/components/nav/Navbar";
import About from "@/sections/About";
import GitHub from "@/sections/GitHub";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <GitHub />
      </main>
    </div>
  );
}
