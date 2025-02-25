import {  z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  universityCard: z.string().nonempty("University Card is required"),
  universityNumber: z.coerce.number(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
