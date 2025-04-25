import { format } from "date-fns";
import { z } from "zod";

export const storeEventSchema = z
    .object({
        name: z.string().min(3, {
            message: "Le titre doit contenir au moins 3 caractères.",
        }),
        description: z.string(),
        startDateTime: z
            .string()
            .min(1, { message: "Date et heure de début requises." })
            .refine((val) => {
                const date = new Date(val);
                return date;
            })
            .transform((val) => format(new Date(val), "yyyy-MM-dd HH:mm:ss")),
        endDateTime: z
            .string()
            .min(1, { message: "Date et heure de fin requise." })
            .refine((val) => {
                const date = new Date(val);
                return date;
            })
            .transform((val) => format(new Date(val), "yyyy-MM-dd HH:mm:ss")),
        location: z.string().min(1, { message: "Le lieu est requis." }),
        category: z.string(),
        organizer: z
            .string()
            .min(1, { message: "Le nom de l'organisateur est requis." }),
        ticketPrice: z
            .number({
                message: "Le prix du ticket est requis.",
            })
            .positive({ message: "Le prix du ticket doit être positif." }),
        maximumCapacity: z
            .number({
                message: "Le nombre maximum de ticket est requis.",
            })
            .positive({
                message: "Le nombre maximum de ticket doit être positif.",
            }),
        targetAudience: z.string(),
        eventLanguages: z.array(z.string()),
        accessibilityForDisabled: z.boolean(),
        organizerContact: z
            .string()
            .min(1, { message: "Le contact de l'organisateur est requis." }),
        program: z.string(),
        promotionalImage: z.custom<File[]>(
            (files) => {
                if (!Array.isArray(files)) return false;

                return files.every((file) => {
                    const isFile = file instanceof File;
                    const isAllowedType =
                        file.type === "image/jpeg" || file.type === "image/png";
                    const hasAllowedExtension =
                        file.name.toLowerCase().endsWith(".jpg") ||
                        file.name.toLowerCase().endsWith(".jpeg") ||
                        file.name.toLowerCase().endsWith(".png");

                    return isFile && isAllowedType && hasAllowedExtension;
                });
            },
            {
                message:
                    "Tous les fichiers doivent être des images au format JPEG ou PNG.",
            }
        ),
        eventStatus: z.number(),
    })
    .refine(
        (data) => new Date(data.startDateTime) < new Date(data.endDateTime),
        {
            message: "La date de fin doit être supérieure à la date de début.",
            path: ["endDateTime"],
        }
    );

export type StoreEventSchemaType = z.infer<typeof storeEventSchema>;
