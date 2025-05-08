import { z } from "zod";

export const updateHotelSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    location: z.string().min(1, "La localisation est requise"),
    accessibilityForDisabled: z.boolean(),
    contact: z.string().min(1, "Le contact est requis"),
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
