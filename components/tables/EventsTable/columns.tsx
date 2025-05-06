"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Location } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import EventsStatusChip from "@/components/chips/EventsStatusChip";
import ActionsCell from "./cells/ActionsCell";

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
                <div className="line-clamp-2 overflow-hidden text-ellipsis text-wrap max-w-[250px]">
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

            return <ActionsCell event={event} />;
        },
    },
];
