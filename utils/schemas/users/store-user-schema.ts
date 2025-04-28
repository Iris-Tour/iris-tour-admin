import { z } from "zod";

export const storeUserSchema = z
    .object({
        lastname: z
            .string()
            .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
        firstname: z.string().min(2, {
            message: "Le prénom doit contenir au moins 2 caractères.",
        }),
        email: z.string().email({ message: "Ce champ est requis." }),
        password: z
            .string()
            .min(1, { message: "Veuillez entrer le mot de passe." })
            .min(8, {
                message: "Le mot de passe doit contenir au moins 8 caractères.",
            }),
        passwordConfirmation: z
            .string()
            .min(1, { message: "Veuillez confirmer le mot de passe." }),
    })
    .refine((val) => val.password === val.passwordConfirmation, {
        message: "Les mots de passe ne correspondent pas.",
        path: ["passwordConfirmation"],
    });

export type StoreUserSchemaType = z.infer<typeof storeUserSchema>;
