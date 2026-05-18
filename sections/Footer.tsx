import { Camera, Code2, Link2, Mail } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/90 backdrop-blur-md transition hover:glow-ring hover:bg-white/7"
    >
      <span className="inline-flex items-center gap-2">
        <span className="text-foreground/80 transition group-hover:text-foreground">
          {icon}
        </span>
        {label}
      </span>
      <span className="text-xs text-muted transition group-hover:text-foreground/80">
        ↗
      </span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="CONTACT"
          title="Let’s build something"
          description="Hubungi saya untuk kolaborasi, freelance, atau sekadar say hi."
        />

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Card className="h-full">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    Email
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Paling cepat lewat email. Saya biasanya balas dalam 1–2 hari.
                  </p>
                </div>

                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm backdrop-blur-md transition hover:glow-ring hover:bg-white/7"
                >
                  <span className="inline-flex items-center gap-2 font-medium">
                    <Mail size={16} className="opacity-80" />
                    {site.email}
                  </span>
                  <span className="text-muted transition group-hover:text-foreground/80">
                    Kirim email →
                  </span>
                </a>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid gap-3">
              <SocialLink
                href={site.social.github}
                label="GitHub"
                icon={<Code2 size={16} />}
              />
              <SocialLink
                href={site.social.linkedin}
                label="LinkedIn"
                icon={<Link2 size={16} />}
              />
              <SocialLink
                href={site.social.instagram}
                label="Instagram"
                icon={<Camera size={16} />}
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js + Tailwind
            + Framer Motion.
          </p>
          <p className="opacity-80">
            Dark-first • Glassmorphism • Neon accents
          </p>
        </div>
      </Container>
    </footer>
  );
}
