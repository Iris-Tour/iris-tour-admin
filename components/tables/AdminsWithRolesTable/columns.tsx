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
import { Edit2, LockSlash, Trash, Unlock } from "iconsax-react";
import SuspendAdminForm from "@/components/forms/admins-management/SuspendAdminForm";
import DeleteAdminForm from "@/components/forms/admins-management/DeleteAdminForm";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SimpleChip from "@/components/chips/SimpleChip";
import AdminsStatusChip from "@/components/chips/AdminsStatusChip";
import UpdateAdminForm from "@/components/forms/admins-management/UpdateAdminForm";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllRoles } from "@/lib/api";
import useAuth from "@/hooks/useAuth";

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
            const admin = row.original.user;
            return <UserAccount user={admin} />;
        },
        filterFn: (row: Row<any>, columnId: string, filterValue: string) => {
            const admin = row.original.admin;
            const name =
                `${admin.firstname} ${admin.lastname}`.toLowerCase() || "";
            const email = admin.email.toLowerCase() || "";
            const value = filterValue.toLowerCase();

            return name.includes(value) || email.includes(value);
        },
    },
    {
        id: "role",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header3" />
            );
        },
        cell: ({ row }) => {
            const roles = row.original.roles;
            return (
                <div className="flex gap-2">
                    {roles.map((role, index) => (
                        <SimpleChip key={index}>{role.slug}</SimpleChip>
                    ))}
                </div>
            );
        },
    },
    {
        id: "admin-status",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header4" />
            );
        },
        cell: ({ row }) => {
            const admin = row.original.user;

            return <AdminsStatusChip admin={admin} />;
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
            const admin = row.original.user;
            const roles = row.original.roles;

            const { token } = useAuth();

            const allRoles = useQuery({
                queryKey: ["get-all-roles"],
                queryFn: () => apiGetAllRoles(token!),
            });

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
                                <DialogTitle>
                                    <Trans i18nKey="roles-and-permissions.admins-list.update-admin-dialog.title" />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <UpdateAdminForm
                                admin={admin}
                                adminRoles={roles}
                                allRoles={allRoles.data?.roles ?? []}
                            />
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger
                            className={`${
                                admin.isActive
                                    ? "text-secondary hover:bg-secondary/10"
                                    : "text-green-600 hover:bg-green-600/10"
                            } px-2 py-2 rounded-md cursor-pointer transition`}
                        >
                            <span className="sr-only">
                                <Trans i18nKey="roles-and-permissions.admins-list.actions.suspend" />
                            </span>
                            {admin.isActive ? (
                                <LockSlash className="stroke-secondary w-5 h-5" />
                            ) : (
                                <Unlock className="stroke-green-600 w-5 h-5" />
                            )}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {admin.isActive ? (
                                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.title1" />
                                    ) : (
                                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.title2" />
                                    )}
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <SuspendAdminForm admin={admin} />
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
                                <DeleteAdminForm admin={admin} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
