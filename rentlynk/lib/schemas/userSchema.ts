import { z } from "zod";

export const userSchema = z.object({
	email: z.email("Please provide a valid email"),
	password: z.string().min(1, "Please provide a better password"),
});
