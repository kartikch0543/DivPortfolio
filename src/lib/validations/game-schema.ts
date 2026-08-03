import { z } from "zod";

export const gameFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().min(1, "Cover image path or URL is required"),
  bannerImage: z.string().min(1, "Banner image path or URL is required"),
  genre: z.array(z.string()).min(1, "Select at least one genre"),
  engine: z.string().min(1, "Engine is required"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  status: z.enum(["released", "in-development", "coming-soon"]),
  cmsStatus: z.enum(["draft", "published", "archived"]),
  releaseDate: z.string().min(1, "Release date is required"),
  estimatedPlaytime: z.string(),
  featured: z.boolean(),
  launchBrowser: z.string().nullable().optional(),
  launchWebgl: z.string().nullable().optional(),
  launchPlayStore: z.string().nullable().optional(),
  launchSteam: z.string().nullable().optional(),
  launchGithub: z.string().nullable().optional(),
  features: z.string().optional(),
  controls: z.string().optional(),
  developerNotes: z.string().optional(),
  developmentStory: z.string().optional(),
  tags: z.string().optional(),
  technologies: z.string().optional(),
});

export type GameFormValues = z.infer<typeof gameFormSchema>;
