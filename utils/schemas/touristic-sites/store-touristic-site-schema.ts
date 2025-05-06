import { z } from "zod";

const validateTimeRange = (timeStr: string) => {
    if (!timeStr) return true; // Allow empty string for closed days
    const [startTime, endTime] = timeStr.split("-");
    if (!startTime || !endTime) return false;

    const [startHours, startMinutes] = startTime
        .split("h")
        .map((num) => parseInt(num));
    const [endHours, endMinutes] = endTime
        .split("h")
        .map((num) => parseInt(num));

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return endTotalMinutes > startTotalMinutes;
};

export const storeTouristicSiteSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    address: z.string().min(1, "L'adresse est requise"),
    category: z.string().min(1, "La catégorie est requise"),
    schedule: z.object({
        lundi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du lundi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        mardi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du mardi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        mercredi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du mercredi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        jeudi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du jeudi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        vendredi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du vendredi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        samedi: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du samedi est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
        dimanche: z
            .string()
            .refine(
                (val) => val === "" || val.length > 0,
                "L'horaire du dimanche est requis si le jour est ouvert"
            )
            .refine(
                validateTimeRange,
                "L'heure de fermeture doit être supérieure à l'heure d'ouverture"
            ),
    }),
    entranceFee: z.string().min(1, "Le prix d'entrée est requis"),
    accessibilityForDisabled: z.boolean(),
    averageRating: z.number().min(0).max(5),
    mainImages: z.custom<File[]>(
        (files) => {
            if (!Array.isArray(files)) return false;
            return files.every((file) => file instanceof File);
        },
        {
            message: "Les fichiers doivent être des images valides.",
        }
    ),
    legalStatus: z.string().min(1, "Le statut légal est requis"),
    staffId: z.number().min(1, "Le guide est requis"),
});
