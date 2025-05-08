"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Location } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import ActionsCell from "./cells/ActionsCell";

export const columns: ColumnDef<TouristicSiteType>[] = [
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
            const site = row.original;
            return <span className="font-semibold">{site.name}</span>;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const site = row.original;
            return (
                <div className="line-clamp-2 overflow-hidden text-ellipsis text-wrap max-w-[250px]">
                    <span className="text-foreground">{site.description}</span>
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
            const site = row.original;
            return (
                <div className="font-semibold text-primary">
                    <span>{site.address}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "entranceFee",
        header: "Prix d'entrée",
        cell: ({ row }) => {
            const site = row.original;
            return (
                <span>
                    {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                    }).format(Number(site.entranceFee))}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell site={row.original} />,
    },
];
