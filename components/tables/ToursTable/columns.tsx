"use client";

import UserAccount from "@/components/UserAccount";
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
import { Edit2, Forbidden, Trash } from "iconsax-react";
import SuspendAdminForm from "@/components/forms/admins-management/SuspendAdminForm";
import DeleteAdminForm from "@/components/forms/admins-management/DeleteAdminForm";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type AdminWithRoles = { user: UserData; roles: Array<RoleType> };

export const columns: ColumnDef<AdminWithRoles>[] = [
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
        accessorKey: "tour.id",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header1" />
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header5" />
            );
        },
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <div className="flex items-center gap-3">
                    <Dialog>
                        <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.edit" />
                            </span>
                            <Edit2 className="stroke-primary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.suspend" />
                            </span>
                            <Forbidden className="stroke-secondary w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.title" />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <SuspendAdminForm
                                    adminName={`${user.firstname} ${user.lastname}`}
                                    adminId={user.id.toString()}
                                />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.delete" />
                            </span>
                            <Trash className="stroke-red-500 w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans i18nKey="roles-and-permissions.admins-list.delete-admin-dialog.title" />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <DeleteAdminForm
                                    adminName={`${user.firstname} ${user.lastname}`}
                                    adminId={user.id.toString()}
                                />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
