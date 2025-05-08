import { z } from "zod";

export const storeHotelSchema = z.object({
    name: z
        .string()
        .min(1, "Le nom est requis")
        .min(3, "Le nom doit contenir au moins 3 caractères"),
    description: z.string().min(1, "La description est requise"),
    location: z
        .string()
        .min(1, "La localisation est requise")
        .min(3, "La localisation doit contenir au moins 3 caractères"),
    accessibilityForDisabled: z.boolean(),
    contact: z
        .string()
        .min(1, "Le contact est requis")
        .min(10, "Le contact doit contenir au moins 10 caractères"),
    hotelImages: z
        .custom<File[]>(
            (files) => {
                if (!Array.isArray(files)) return false;
                return files.every((file) => file instanceof File);
            },
            {
                message: "Les fichiers doivent être des images valides.",
            }
        ),
});
