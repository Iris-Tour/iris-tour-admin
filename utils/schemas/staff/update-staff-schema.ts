import { z } from "zod";

export const updateStaffSchema = z.object({
    imagePath: z.custom<File>(
        (file) => {
            if (!file) return false;

            const isFile = file instanceof File;
            const isAllowedType =
                file.type === "image/jpeg" || file.type === "image/png";
            const hasAllowedExtension =
                file.name.toLowerCase().endsWith(".jpg") ||
                file.name.toLowerCase().endsWith(".jpeg") ||
                file.name.toLowerCase().endsWith(".png");

            return isFile && isAllowedType && hasAllowedExtension;
        },
        {
            message:
                "Tous les fichiers doivent être des images au format JPEG ou PNG.",
        }
    ),
    name: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    type: z.number().min(1, { message: "Le type est requis." }),
    phone: z
        .string()
        .min(9, {
            message:
                "Le numéro de téléphone doit contenir 9 chiffres.",
        }),
    email: z.string().email({ message: "L'email est invalide." }),
    languages: z
        .array(z.string())
        .min(1, { message: "Au moins une langue est requise." }),
    address: z
        .string()
        .min(5, { message: "L'adresse doit contenir au moins 5 caractères." }),
});

export type UpdateStaffSchemaType = z.infer<typeof updateStaffSchema>;
