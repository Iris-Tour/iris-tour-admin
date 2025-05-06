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
import { Edit2, Eye, Trash, Location } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import UpdateTouristicSiteForm from "@/components/forms/touristic-sites/UpdateTouristicSiteForm";
import DeleteTouristicSiteForm from "@/components/forms/touristic-sites/DeleteTouristicSiteForm";
import Link from "next/link";
import { Trans } from "react-i18next";

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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const site = row.original;
            return (
                <div className="flex items-center gap-3">
                    <Dialog>
                        <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="touristic-sites.actions.edit" />
                            </span>
                            <Edit2 className="stroke-primary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans i18nKey="touristic-sites.update-site-dialog.title" />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <UpdateTouristicSiteForm site={site} />
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="touristic-sites.actions.delete" />
                            </span>
                            <Trash className="stroke-red-500 w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans i18nKey="touristic-sites.delete-site-dialog.title" />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <DeleteTouristicSiteForm site={site} />
                        </DialogContent>
                    </Dialog>
                    <Link
                        href={`/touristic-sites/${site.id}`}
                        className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition"
                    >
                        <span className="sr-only">
                            <Trans i18nKey="touristic-sites.actions.view" />
                        </span>
                        <Eye className="stroke-secondary w-5 h-5" />
                    </Link>
                </div>
            );
        },
    },
];
