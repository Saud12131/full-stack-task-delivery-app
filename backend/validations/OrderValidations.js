import { z } from "zod";

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: z.string().min(1, "Menu item ID is required"), // Ensure menuItemId is provided
        quantity: z.number().int().min(1, "Quantity must be at least 1"), // Ensure quantity is a positive integer
      })
    )
    .nonempty("At least one item is required"), // Ensure items array is not empty
  totalAmount: z.number().min(0, "Total amount must be at least 0"), // Ensure totalAmount is non-negative
  status: z.enum(["Pending", "Completed"]).optional(), // Optional status field
});
