import { z } from "zod";

export const storeStaffSchema = z.object({
    imagePath: z
        .custom<File | undefined>(
            (file) => {
                if (!file) return true; // Allow undefined/null values

                if (!(file instanceof File)) return false;

                const isAllowedType =
                    file.type === "image/jpeg" || file.type === "image/png";
                const hasAllowedExtension =
                    file.name.toLowerCase().endsWith(".jpg") ||
                    file.name.toLowerCase().endsWith(".jpeg") ||
                    file.name.toLowerCase().endsWith(".png");

                return isAllowedType && hasAllowedExtension;
            },
            {
                message:
                    "Le fichier doit être une image au format JPEG ou PNG.",
            }
        )
        .optional(),
    name: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    type: z
        .number({
            message: "Le type est requis.",
        })
        .int()
        .refine((type) => !isNaN(type) && type >= 0, {
            message: "Le type est requis.",
        }),
    phone: z.string().min(9, {
        message: "Le numéro de téléphone doit contenir 9 chiffres.",
    }),
    email: z.string().email({ message: "L'email est invalide." }),
    languages: z
        .array(z.string())
        .min(1, { message: "Au moins une langue est requise." }),
    address: z
        .string()
        .min(5, { message: "L'adresse doit contenir au moins 5 caractères." }),
});

export type StoreStaffSchemaType = z.infer<typeof storeStaffSchema>;
