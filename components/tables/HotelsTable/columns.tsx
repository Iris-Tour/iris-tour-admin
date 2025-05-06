"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Location } from "iconsax-react";
import ActionsCell from "./cells/ActionsCell";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<HotelType>[] = [
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
            const hotel = row.original;
            return <span className="font-semibold">{hotel.name}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const hotel = row.original;
            return (
                <div className="line-clamp-2 overflow-hidden text-ellipsis text-wrap max-w-[250px]">
                    <span className="text-foreground">{hotel.description}</span>
                </div>
            );
        },
    },
    {
        id: "location",
        header: () => {
            return (
                <div className="flex items-center gap-1">
                    Localisation
                    <Location className="w-4 h-4 stroke-accent-foreground" />
                </div>
            );
        },
        cell: ({ row }) => {
            const hotel = row.original;
            return (
                <div className="font-semibold text-primary">
                    <span>{hotel.location}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "contact",
        header: "Contact",
        cell: ({ row }) => {
            const hotel = row.original;
            return <span>{hotel.contact}</span>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell hotel={row.original} />,
    },
];
