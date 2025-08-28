export const siteConfig = {
  name: "Next.js Boilerplate",
  description: "A high-performance static site generator built with Next.js 15, Material UI, and TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  creator: "@nextjs-boilerplate",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Material UI",
    "Static Site Generator",
    "Boilerplate",
    "Frontend"
  ],
  authors: [
    {
      name: "Next.js Boilerplate",
      url: "https://github.com/nextjs-boilerplate",
    },
  ],
  links: {
    github: "https://github.com/nextjs-boilerplate",
    twitter: "https://twitter.com/nextjs-boilerplate",
    docs: "https://docs.nextjs-boilerplate.com",
  },
  defaultLocale: "en" as const,
  locales: ["en", "es"] as const,
}

export type SiteConfig = typeof siteConfig;
