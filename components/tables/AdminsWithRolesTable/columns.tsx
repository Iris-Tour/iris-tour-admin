"use client";

import UserAccount from "@/components/UserAccount";
import { ColumnDef } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SimpleChip from "@/components/chips/SimpleChip";
import AdminsStatusChip from "@/components/chips/AdminsStatusChip";
import ActionsCell from "./cells/ActionsCell";

export const getColumns = (
    allRoles: Array<RoleType>
): ColumnDef<AdminWithRoles>[] => [
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
            const admin = row.original.user;
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

            return (
                <ActionsCell
                    admin={admin}
                    adminRoles={roles}
                    allRoles={allRoles}
                />
            );
        },
    },
];
