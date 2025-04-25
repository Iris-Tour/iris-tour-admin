import { z } from "zod";

export const updateAdminSchema = z.object({
    lastname: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z
        .string()
        .min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Ce champ est requis." }),
    roles: z
        .array(z.number().int().positive("ID de rôle invalide"))
        .refine((roles) => roles.length > 0, {
            message: "Veuillez sélectionner au moins un rôle.",
        }),
});

export type UpdateAdminSchemaType = z.infer<typeof updateAdminSchema>;