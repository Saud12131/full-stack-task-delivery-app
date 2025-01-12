import { z } from "zod";


export const menuSchema = z.object({
    name: z.string().min(1, "Menu name is required"), // Ensure menu name is provided
    price: z.number().min(0, "Price must be at least 0"), // Ensure price is non-negative
    category: z.string().min(1, "Category is required"), // Ensure category is provided
    available: z.boolean(), // Ensure availability is provided
  });
  