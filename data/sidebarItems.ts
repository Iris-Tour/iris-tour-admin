import { BookSaved, Bus, Car, House2, Ticket, User } from "iconsax-react";
import { MountainSnow, UserCog } from "lucide-react";

export const sidebarItems = [
    {
        title: "Tableau de bord",
        url: "/dashboard",
        icon: House2,
    },
    {
        title: "Gestion des réservations",
        url: "/manage-reservations",
        icon: BookSaved,
    },
    {
        title: "Excursions",
        url: "/tours",
        icon: Car,
    },
    {
        title: "Evénements",
        url: "/events",
        icon: Ticket,
    },
    {
        title: "Sites touristiques",
        url: "/tourist-sites",
        icon: MountainSnow,
    },
    { title: "Transports", url: "/transport", icon: Bus },
    {
        title: "Rôles & Permissions",
        url: "/roles-and-permissions",
        icon: UserCog,
    },
    {
        title: "Gestion des utilisateurs",
        url: "/manage-users",
        icon: User,
    },
];
