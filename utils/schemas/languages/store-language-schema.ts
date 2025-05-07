import { z } from "zod";

export const storeLanguageSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Le titre doit contenir au moins 2 caractères." }),
});

export type StoreLanguageSchemaType = z.infer<typeof storeLanguageSchema>;
