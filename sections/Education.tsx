import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="EDUCATION"
          title="Pendidikan"
          description="Riwayat pendidikan dalam card layout yang clean dan minimal."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {site.education.map((ed, idx) => (
            <Reveal key={`${ed.school}-${idx}`} delay={idx * 0.06}>
              <Card className="h-full hover:glow-ring transition">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {ed.school}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{ed.major}</p>
                  </div>
                  <p className="text-xs font-medium tracking-wide text-muted/90">
                    {ed.period}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

