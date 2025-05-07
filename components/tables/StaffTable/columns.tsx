"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SimpleChip from "@/components/chips/SimpleChip";
import ActionsCell from "./cells/ActionsCell";
import StaffAccount from "@/components/StaffAccount";
import { staffTypes } from "@/constants/staffTypes";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const getColumns = (): ColumnDef<StaffType>[] => [
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
        id: "account",
        header: () => {
            return <Trans i18nKey="manage-staff.staff-list.headers.header1" />;
        },
        cell: ({ row }) => {
            const staff = row.original;
            return <StaffAccount user={staff} />;
        },
        filterFn: (row: Row<any>, columnId: string, filterValue: string) => {
            const staff = row.original;
            const firstname = staff.firstname.toLowerCase() || "";
            const lastname = staff.lastname.toLowerCase() || "";
            const email = staff.email.toLowerCase() || "";
            const value = filterValue.toLowerCase();

            return (
                firstname.includes(value) ||
                lastname.includes(value) ||
                email.includes(value)
            );
        },
    },
    {
        id: "type",
        header: () => {
            return <Trans i18nKey="manage-staff.staff-list.headers.header2" />;
        },
        cell: ({ row }) => {
            const staff = row.original;
            return (
                <div className="flex gap-2">
                    <SimpleChip>{staffTypes[staff.type].label}</SimpleChip>
                </div>
            );
        },
    },
    {
        id: "phone",
        header: () => {
            return <Trans i18nKey="manage-staff.staff-list.headers.header3" />;
        },
        cell: ({ row }) => {
            const staff = row.original;
            return <span>{staff.phoneNumber || "Non renseigné"}</span>;
        },
    },
    {
        id: "languages",
        header: () => {
            return <Trans i18nKey="manage-staff.staff-list.headers.header5" />;
        },
        cell: ({ row }) => {
            const staff = row.original;
            return (
                <div className="flex flex-wrap gap-1">
                    {staff.languages && staff.languages.length > 0 ? (
                        staff.languages.map((lang, index) => (
                            <SimpleChip key={index}>{lang.title}</SimpleChip>
                        ))
                    ) : (
                        <span className="text-muted-foreground">
                            Non renseigné
                        </span>
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: () => {
            return <Trans i18nKey="manage-staff.staff-list.headers.header7" />;
        },
        cell: ({ row }) => {
            const staff = row.original;
            return <ActionsCell staff={staff} />;
        },
    },
];
