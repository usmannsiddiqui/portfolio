export const personal = {
  name: "Muhammad Usman Siddiqui",
  headline: "AI, Automation, and Technology Consultant",
  subheadline:
    "Penn State Computer Science student focused on AI, automation, practical software development, and helping people use technology more effectively.",
  location: "Penn State University",
  email: "usmansiddiquiii645@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-siddiquii",
  github: "https://github.com/usmannsiddiqui",
  aiGuides: "https://itld.psu.edu/ai-guides/",
  photo: "/profile.png",
  resume: "/resume.pdf",
}

export const about = {
  bio: [
    "I'm a Computer Science student at Penn State with interests in AI, automation, technology consulting, and practical software development. I enjoy working at the intersection of technical systems and real people — whether that means supporting AI adoption, improving workflows, or contributing to software that solves meaningful problems.",
    "My experience spans AI enablement, internal software development, consulting, and campus technology initiatives. I'm especially drawn to work that combines technical depth with communication, systems thinking, and user impact.",
  ],
}

export type ExperienceEntry = {
  title: string
  org: string
  period: string
  summary: string
  bullets: string[]
  links?: { label: string; href: string }[]
}

export const experience: ExperienceEntry[] = [
  {
    title: "AI Guide / AI Consultant",
    org: "Penn State IT Learning & Development",
    period: "Fall 2025 – Present",
    summary:
      "Support faculty and staff in exploring practical uses of AI tools, especially Microsoft Copilot and related workflow solutions, as part of Penn State's broader AI initiative.",
    bullets: [
      "Help faculty and staff understand and apply AI tools in practical, day-to-day workflows.",
      "Support Microsoft Copilot consultations and user-facing AI adoption efforts.",
      "Contribute to AI education through guidance, demonstrations, and tutorial-style resources.",
      "Represent Penn State's broader AI Guides initiative through campus-facing support and outreach.",
    ],
    links: [
      { label: "AI Guides", href: "https://itld.psu.edu/ai-guides/" },
      {
        label: "Meet the Guides",
        href: "https://itld.psu.edu/2025/10/20/meet-the-penn-state-ai-guides/",
      },
      {
        label: "Video Series",
        href: "https://psu.mediaspace.kaltura.com/channel/Penn%2BState%2BAI%2BGuides/400342813",
      },
    ],
  },
  {
    title: "Software Developer Intern",
    org: "Penn State Libraries",
    period: "Fall 2025 – Present",
    summary:
      "Contribute to internal software and data integration work in a Ruby on Rails environment, including backend workflows supporting faculty records and academic reporting systems.",
    bullets: [
      "Worked on a backend integration connecting ETDA Workflow, FAMS Tools, and Activity Insight for faculty committee data.",
      "Built and tested an API client for retrieving committee records from ETDA.",
      "Helped plan importer logic for mapping external JSON data into internal Rails models and database records.",
      "Considered batching, duplicate handling, logging, and fault tolerance for reliable imports.",
    ],
  },
  {
    title: "Consultant Trainee",
    org: "Nittany Lion Consulting Group",
    period: "Aug 2025 – Dec 2025",
    summary:
      "Develop consulting and structured problem-solving skills through team-based analysis, communication, and client-oriented thinking.",
    bullets: [
      "Practice breaking down open-ended problems into clear frameworks and recommendations.",
      "Contribute to team-based consulting work that emphasizes communication, collaboration, and structured thinking.",
    ],
  },
  {
    title: "Communications Organizer",
    org: "HackPSU",
    period: "Aug 2025 – Dec 2025",
    summary:
      "Support communications and outreach for Penn State's flagship hackathon, helping strengthen engagement across the student innovation community.",
    bullets: [
      "Help with messaging, outreach, and event-related communication.",
      "Contribute to promoting student innovation and technology-focused programming.",
    ],
  },
]

export type WorkEntry = {
  title: string
  category: string
  description: string
  highlights: string[]
  links?: { label: string; href: string }[]
  note?: string
}

export const work: WorkEntry[] = [
  {
    title: "AI Guidance and Enablement at Penn State",
    category: "AI · Consulting · Education",
    description:
      "Help faculty and staff adopt AI tools more effectively through consultations, workflow guidance, and educational support as part of Penn State's AI Guides initiative.",
    highlights: [
      "Microsoft Copilot support",
      "AI workflow guidance",
      "Tutorial & resource creation",
      "Campus AI initiative",
    ],
    links: [
      { label: "View AI Guides", href: "https://itld.psu.edu/ai-guides/" },
      {
        label: "Video Series",
        href: "https://psu.mediaspace.kaltura.com/channel/Penn%2BState%2BAI%2BGuides/400342813",
      },
    ],
  },
  {
    title: "Faculty Committee Records Integration",
    category: "Software Development · Data Integration",
    description:
      "Helped design and build a backend integration that pulls faculty committee data from ETDA Workflow into FAMS Tools for downstream export to Activity Insight.",
    highlights: [
      "API client development",
      "Rails-based importer logic",
      "JSON-to-model mapping",
      "Error handling & reliability",
    ],
    note: "Internal project — implementation details are not public.",
  },
]

export const skills: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "TypeScript", "Ruby", "SQL", "C"],
  Frameworks: ["React", "Next.js", "Ruby on Rails", "Tailwind CSS"],
  "AI / Automation": [
    "LLMs",
    "Microsoft Copilot",
    "Copilot Studio",
    "Prompt Engineering",
    "AI Agent Development",
    "Power Automate",
  ],
  Tools: ["Git", "Docker", "Linux", "Claude Code"],
}
