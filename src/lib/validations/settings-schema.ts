import { z } from "zod";

export const siteSettingsSchema = z.object({
  studioName: z.string().min(2, "Studio name required"),
  tagline: z.string().min(5, "Tagline required"),
  description: z.string().min(10, "Description required"),
  canonicalUrl: z.string().url("Must be a valid URL"),
  contactEmail: z.string().email("Must be a valid email"),
  maintenanceMode: z.boolean(),
  featuredGameSlug: z.string(),
  socialGithub: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialItchIo: z.string().optional(),
  socialDiscord: z.string().optional(),
  socialYoutube: z.string().optional(),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

export const profileSettingsSchema = z.object({
  name: z.string().min(2, "Name required"),
  username: z
    .string()
    .min(2, "Username required")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  bio: z.string().max(300, "Bio cannot exceed 300 characters"),
  avatarUrl: z.string().min(1, "Avatar URL required"),
  email: z.string().email("Valid email required"),
  role: z.enum(["Guest", "Player", "Developer", "Admin"]),
  website: z.string().optional(),
  github: z.string().optional(),
  twitter: z.string().optional(),
  itchIo: z.string().optional(),
  discord: z.string().optional(),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;
