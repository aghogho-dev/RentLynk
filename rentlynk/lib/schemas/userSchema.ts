import { z } from "zod";

export const userSchema = z.object({
	name: z.string().min(3, "Please enter a better name").optional(),
	email: z.email("Please provide a valid email"),
	password: z.string().min(1, "Please provide a better password"),
});
