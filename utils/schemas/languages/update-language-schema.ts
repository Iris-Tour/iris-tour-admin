import { z } from "zod";

export const updateLanguageSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Le titre doit contenir au moins 2 caractères." }),
});

export type UpdateLanguageSchemaType = z.infer<typeof updateLanguageSchema>;
