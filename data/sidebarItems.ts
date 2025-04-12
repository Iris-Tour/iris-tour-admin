import { BookSaved, Car, House2, Ticket } from "iconsax-react";
import { Home, UserCog } from "lucide-react";

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
        title: "Excursions et Tours",
        url: "/excursions-and-tours",
        icon: Car,
    },
    {
        title: "Evénements",
        url: "/events",
        icon: Ticket,
    },
    {
        title: "Rôles & Permissions",
        url: "/roles-and-permissions",
        icon: UserCog,
    },
];
