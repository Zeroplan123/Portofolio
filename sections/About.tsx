import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="PROFIL SAYA"
          title="Tentang saya"
          description="Ringkas, jelas, dan fokus pada impact — saya suka UI yang rapi, animasi yang halus, dan integrasi data yang solid."
        />

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Card>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 p-1">
                    <div className="h-full w-full rounded-xl [background:linear-gradient(135deg,rgba(34,211,238,0.32),rgba(124,58,237,0.34))]" />
                  </div>
                  <div className="pointer-events-none absolute -inset-2 -z-10 rounded-3xl opacity-60 blur-xl [background:radial-gradient(closest-side,rgba(124,58,237,0.22),transparent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold tracking-tight">
                    Halo, saya {site.name}.
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Saya membangun website modern dengan pendekatan{" "}
                    <span className="text-foreground/90">clean UI</span>,{" "}
                    <span className="text-foreground/90">motion</span> yang smooth,
                    dan fokus performa. Saat ini saya tertarik pada Next.js App
                    Router, design system ringan, dan visual futuristik
                    (glass/blur + neon accent).
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card>
              <h3 className="text-sm font-semibold tracking-tight">
                Skill stack
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">
                Tools yang sering saya pakai untuk membangun produk end-to-end.
              </p>
              <Stagger className="mt-4 flex flex-wrap gap-2">
                {site.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <Badge>{skill}</Badge>
                  </StaggerItem>
                ))}
              </Stagger>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

