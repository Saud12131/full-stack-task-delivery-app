import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(1, "Username is required"), // Ensure username is provided
    password: z.string().min(4, "Password must be at least 4 characters long"), // Ensure password meets minimum length
});
