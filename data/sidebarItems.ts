import {
    BookSaved,
    Bus,
    Car,
    House2,
    Ticket,
    User,
    UserSquare,
} from "iconsax-react";
import { MountainSnow, UserCog, Hotel, Languages } from "lucide-react";

export const sidebarItems = [
    {
        title: "Tableau de bord",
        url: "/dashboard",
        icon: House2,
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
        url: "/touristic-sites",
        icon: MountainSnow,
    },
    {
        title: "Gestion des hôtels",
        url: "/manage-hotels",
        icon: Hotel,
    },
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
    {
        title: "Gestion du Staff",
        url: "/manage-staff",
        icon: UserSquare,
    },
    {
        title: "Gestion des langues",
        url: "/manage-languages",
        icon: Languages,
    },
    {
        title: "Gestion des réservations",
        url: "/manage-reservations",
        icon: BookSaved,
    },
    { title: "Transports", url: "/transport", icon: Bus },
];
