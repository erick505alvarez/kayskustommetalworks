import { defineCollection, z } from "astro:content";

const modelsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    parts: z.array(
      z.object({
        image: z.string(),
        name: z.string(),
        description: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  models: modelsCollection,
};
