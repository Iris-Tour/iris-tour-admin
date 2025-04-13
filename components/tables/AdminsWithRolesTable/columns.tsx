"use client";

import { ColumnDef } from "@tanstack/react-table";

export type AdminWithRoles = { user: UserData; roles: Array<RoleType> };

export const columns: ColumnDef<AdminWithRoles>[] = [
    {
        accessorKey: "user.id",
        header: "ID No.",
    },
    {
        accessorKey: "user.email",
        header: "Email",
    },
];
