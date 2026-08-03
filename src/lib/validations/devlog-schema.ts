import { z } from "zod";

export const devlogFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  summary: z.string().min(5, "Summary must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  gameSlug: z.string().optional(),
  tags: z.string().transform((val) => val.split(",").map((s) => s.trim()).filter(Boolean)),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  coverImage: z.string().optional(),
});

export type DevlogFormValues = z.infer<typeof devlogFormSchema>;
