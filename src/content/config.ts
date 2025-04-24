// src/content/config.ts
import { defineCollection, z } from "astro:content";

const modelsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    parts: z.array(
      z.object({
        imagePath: z.string(), // absolute path from root. Ex: /src/assets/imgs/*.webp
        name: z.string(),
        description: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  models: modelsCollection,
};
