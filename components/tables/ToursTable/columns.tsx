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
import { Trans } from "react-i18next";
import {
    Calendar,
    Edit2,
    Eye,
    Forbidden,
    Location,
    Trash,
} from "iconsax-react";
import SuspendAdminForm from "@/components/forms/admins-management/SuspendAdminForm";
import DeleteAdminForm from "@/components/forms/admins-management/DeleteAdminForm";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateTourForm from "@/components/forms/tours/UpdateTourForm";
import DeleteTourForm from "@/components/forms/tours/DeleteTourForm";
import SimpleChip from "@/components/chips/SimpleChip";
import DetailsTourForm from "@/components/forms/tours/DetailsTourForm";
import { statuses } from "@/constants/statuses";
import ToursStatusChip from "@/components/chips/ToursStatusChip";

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
                <div className="truncate max-w-[250px]">
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
    {
        accessorKey: "departureDateTime",
        header: () => {
            return (
                <div className="flex items-center gap-1">
                    Départ
                    <Calendar className="w-4 h-4 stroke-accent-foreground" />
                </div>
            );
        },
        cell: ({ row }) => {
            const tour = row.original;

            return (
                <div className="flex flex-col text-foreground">
                    <span>
                        {format(
                            new Date(tour.departureDateTime),
                            "E dd MMMM yyyy",
                            { locale: fr }
                        )}
                    </span>
                    <span>
                        {format(new Date(tour.departureDateTime), "HH'h' mm", {
                            locale: fr,
                        })}
                    </span>
                </div>
            );
        },
    },
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
            return (
                <div className="flex items-center gap-3">
                    <Dialog>
                        <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                Modifier l'excursion
                            </span>
                            <Edit2 className="stroke-primary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Modifier l'excursion</DialogTitle>
                                <DialogDescription></DialogDescription>
                                <UpdateTourForm tour={tour} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                Supprimer l'excursion
                            </span>
                            <Trash className="stroke-red-500 w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Supprimer l'excursion</DialogTitle>
                                <DialogDescription></DialogDescription>
                                <DeleteTourForm tour={tour} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">Détails</span>
                            <Eye className="stroke-secondary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-10">
                                    Détails <ToursStatusChip tour={tour} />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <DetailsTourForm tour={tour} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
