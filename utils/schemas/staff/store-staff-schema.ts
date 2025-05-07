import { z } from "zod";

export const storeStaffSchema = z.object({
    image_path: z.custom<File[]>(
        (files) => {
            if (!Array.isArray(files)) return false;

            return files.every((file) => {
                const isFile = file instanceof File;
                const isAllowedType =
                    file.type === "image/jpeg" ||
                    file.type === "image/png" ||
                    file.type === "image/jpg";
                const hasAllowedExtension =
                    file.name.toLowerCase().endsWith(".jpg") ||
                    file.name.toLowerCase().endsWith(".jpeg") ||
                    file.name.toLowerCase().endsWith(".png");

                return isFile && isAllowedType && hasAllowedExtension;
            });
        },
        {
            message: "Le fichier doit être une image au format JPEG ou PNG.",
        }
    ),
    firstname: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    lastname: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    type: z
        .number({
            message: "Le type est requis.",
        })
        .int()
        .refine((type) => type > -1, {
            message: "Le type est requis.",
        }),
    dialCode: z.string().min(1, {
        message: "Le code du pays est requis.",
    }),
    phoneNumber: z.string().min(9, {
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
