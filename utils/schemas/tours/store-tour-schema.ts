import { z } from "zod";
import { format } from "date-fns";

export const storeTourSchema = z
    .object({
        title: z.string().min(2, {
            message: "Le titre doit contenir au moins 2 caractères.",
        }),
        description: z
            .string()
            .min(1, { message: "Une description est requise." }),
        departureDateTime: z
            .string()
            .min(1, { message: "Date et heure de départ requises." })
            .refine((val) => {
                const date = new Date(val);
                return date;
            })
            .transform((val) => format(new Date(val), "yyyy-MM-dd HH:mm:ss")),
        arrivalDateTime: z
            .string()
            .min(1, { message: "Date de retour requise." })
            .refine((val) => {
                const date = new Date(val);
                return date;
            })
            .transform((val) => format(new Date(val), "yyyy-MM-dd HH:mm:ss")),
        difficulty: z.number().refine((val) => val >= 0, {
            message: "La difficulté est requise.",
        }),
        totalDistance: z
            .number({
                message: "La distance est requise.",
            })
            .refine((val) => val > 0, {
                message: "La distance doit être supérieure à 0.",
            }),
        excursionPrice: z
            .number({
                message: "Le prix de l'excursion est requis.",
            })
            .refine((val) => val > 0, {
                message: "Le prix doit être supérieur à 0.",
            }),
        departurePoint: z
            .string()
            .min(1, { message: "Le lieu de départ est requis." }),
        arrivalPoint: z
            .string()
            .min(1, { message: "Le lieu d'arrivée est requis." }),
        staffId: z.number().refine((val) => val > 0, {
            message: "Le guide est requis.",
        }),
        maxParticipants: z
            .number({
                message: "Le nombre maximum de participants est requis.",
            })
            .refine((val) => val > 0, {
                message: "Le prix doit être supérieur à 0.",
            }),
        requiredEquipment: z.string(),
        mainImages: z.custom<File[]>(
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
                message:
                    "Tous les fichiers doivent être des images au format JPEG ou PNG.",
            }
        ),
        status: z.number().refine((val) => val >= 0, {
            message: "Le statut est requis.",
        }),
    })
    .refine(
        (data) =>
            new Date(data.departureDateTime) < new Date(data.arrivalDateTime),
        {
            message: "La date de fin doit être supérieure à la date de début.",
            path: ["arrivalDateTime"],
        }
    );
