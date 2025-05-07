"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Calendar,
    Edit2,
    Eye,
    Forbidden,
    Location,
    Trash,
} from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateTourForm from "@/components/forms/tours/UpdateTourForm";
import DeleteTourForm from "@/components/forms/tours/DeleteTourForm";
import DetailsTourForm from "@/components/forms/tours/DetailsTourForm";
import ToursStatusChip from "@/components/chips/ToursStatusChip";
import Link from "next/link";
import ActionsCell from "./cells/ActionsCell";

export const columns: ColumnDef<TourType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Nom",
        cell: ({ row }) => {
            const tour = row.original;

            return <span className="font-semibold">{tour.title}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const tour = row.original;

            return (
                <div className="line-clamp-2 overflow-hidden text-ellipsis text-wrap max-w-[250px]">
                    <span className="text-foreground">{tour.description}</span>
                </div>
            );
        },
    },
    {
        id: "journey",
        header: () => {
            return (
                <div className="flex items-center gap-1">
                    Itinéraire
                    <Location className="w-4 h-4 stroke-accent-foreground" />
                </div>
            );
        },
        cell: ({ row }) => {
            const tour = row.original;

            return (
                <div className="font-semibold text-primary">
                    <span>{tour.departurePoint}</span>
                    {" - "}
                    <span>{tour.arrivalPoint}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "excursionPrice",
        header: "Prix",
        cell: ({ row }) => {
            const tour = row.original;
            const formattedPrice = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
            }).format(tour.excursionPrice);

            return <span className="font-bold">{formattedPrice}</span>;
        },
    },
    // {
    //     accessorKey: "departureDateTime",
    //     header: () => {
    //         return (
    //             <div className="flex items-center gap-1">
    //                 Départ
    //                 <Calendar className="w-4 h-4 stroke-accent-foreground" />
    //             </div>
    //         );
    //     },
    //     cell: ({ row }) => {
    //         const tour = row.original;

    //         return (
    //             <div className="flex flex-col text-foreground">
    //                 <span>
    //                     {format(
    //                         new Date(tour.departureDateTime),
    //                         "E dd MMMM yyyy",
    //                         { locale: fr }
    //                     )}
    //                 </span>
    //                 <span>
    //                     {format(new Date(tour.departureDateTime), "HH'h' mm", {
    //                         locale: fr,
    //                     })}
    //                 </span>
    //             </div>
    //         );
    //     },
    // },
    {
        id: "status",
        header: "Statut",
        cell: ({ row }) => {
            const tour = row.original;

            return <ToursStatusChip tour={tour} />;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const tour = row.original;
            return <ActionsCell tour={tour} />;
        },
    },
];
