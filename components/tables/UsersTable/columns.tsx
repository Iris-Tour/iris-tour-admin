"use client";

import UserAccount from "@/components/UserAccount";
import { ColumnDef } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import AdminsStatusChip from "@/components/chips/AdminsStatusChip";
import ActionsCell from "./cells/ActionsCell";

export const columns: ColumnDef<UserType>[] = [
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
        accessorKey: "id",
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
            const user = row.original;
            return <UserAccount user={user} />;
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
        id: "status",
        header: () => {
            return (
                <Trans i18nKey="roles-and-permissions.admins-list.headers.header4" />
            );
        },
        cell: ({ row }) => {
            const user = row.original;

            return <AdminsStatusChip admin={user} />;
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
            const user = row.original;

            return <ActionsCell user={user} />;
        },
    },
];
