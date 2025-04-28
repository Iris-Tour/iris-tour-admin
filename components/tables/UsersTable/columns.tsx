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
    Location,
    Trash,
} from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Trans } from "react-i18next";
import EventsStatusChip from "@/components/chips/EventsStatusChip";

export const columns: ColumnDef<EventType>[] = [
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
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => {
            const event = row.original;

            return <span className="font-semibold">{event.name}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const event = row.original;

            return (
                <div className="truncate max-w-[250px]">
                    <span className="text-foreground">{event.description}</span>
                </div>
            );
        },
    },
    {
        id: "location",
        header: () => {
            return (
                <div className="flex items-center gap-1">
                    Lieu
                    <Location className="w-4 h-4 stroke-accent-foreground" />
                </div>
            );
        },
        cell: ({ row }) => {
            const event = row.original;

            return (
                <div className="font-semibold text-primary">
                    <span>{event.location}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "ticketPrice",
        header: "Prix",
        cell: ({ row }) => {
            const event = row.original;
            const formattedPrice = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
            }).format(event.ticketPrice);

            return <span className="font-bold">{formattedPrice}</span>;
        },
    },
    {
        accessorKey: "startDateTime",
        header: () => {
            return (
                <div className="flex items-center gap-1">
                    Départ
                    <Calendar className="w-4 h-4 stroke-accent-foreground" />
                </div>
            );
        },
        cell: ({ row }) => {
            const event = row.original;

            return (
                <div className="flex flex-col text-foreground">
                    <span>
                        {format(
                            new Date(event.startDateTime),
                            "E dd MMMM yyyy",
                            { locale: fr }
                        )}
                    </span>
                    <span>
                        {format(new Date(event.startDateTime), "HH'h' mm", {
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
            const event = row.original;

            return <EventsStatusChip event={event} />;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const event = row.original;
            return (
                <div className="flex items-center gap-3">
                    <Dialog>
                        <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                Modifier l'événement
                            </span>
                            <Edit2 className="stroke-primary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Modifier l'événement</DialogTitle>
                                <DialogDescription></DialogDescription>
                                {/* <UpdateTourForm event={event} /> */}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                Supprimer l'événement
                            </span>
                            <Trash className="stroke-red-500 w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Supprimer l'événement</DialogTitle>
                                <DialogDescription></DialogDescription>
                                {/* <DeleteTourForm event={event} /> */}
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
                                    Détails <EventsStatusChip event={event} />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                {/* <DetailsTourForm event={event} /> */}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
