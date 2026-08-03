import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Valid email address is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z.string().min(2, "Full name required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Valid email address required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Player", "Developer"]).default("Player"),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
