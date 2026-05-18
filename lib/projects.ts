export type Project = {
  title: string;
  description: string;
  tags: string[];
  links?: {
    github?: string;
    live?: string;
  };
  year?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    year: "2026",
    description:
      "Deskripsi singkat project. Jelaskan masalah, solusi, dan impact dalam 1-2 kalimat.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    links: { github: "https://github.com/your-username/project-one", live: "#" },
  },
  {
    title: "Project Two",
    year: "2025",
    description:
      "Deskripsi singkat project. Fokus pada fitur utama dan teknologi yang dipakai.",
    tags: ["React", "API", "UI/UX"],
    links: { github: "https://github.com/your-username/project-two" },
  },
  {
    title: "Project Three",
    year: "2024",
    description:
      "Deskripsi singkat project. Tulis highlight: performance, animation, atau integration.",
    tags: ["Node.js", "REST", "Auth"],
    links: { live: "#" },
  },
];
