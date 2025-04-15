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
import Button1 from "@/components/buttons/Button1";
import { Edit2, Forbidden, Trash } from "iconsax-react";

export type AdminWithRoles = { user: UserData; roles: Array<RoleType> };

export const columns: ColumnDef<AdminWithRoles>[] = [
    {
        accessorKey: "user.id",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header1" />
            );
        },
    },
    {
        id: "account",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header2" />
            );
        },
        cell: ({ row }) => {
            const user = row.original.user;
            return <UserAccount user={user} />;
        },
    },
    {
        id: "role",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header3" />
            );
        },
    },
    {
        accessorKey: "user.status",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header4" />
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
                        <DialogTrigger className="text-primary-color hover:bg-primary-color/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.edit" />
                            </span>
                            <Edit2 className="stroke-primary-color w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-secondary-color hover:bg-secondary-color/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.suspend" />
                            </span>
                            <Forbidden className="stroke-secondary-color w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.suspend" />
                            </span>
                            <Trash className="stroke-red-500 w-5 h-5" />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
