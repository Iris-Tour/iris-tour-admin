import { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./cells/ActionsCell";

export const columns: ColumnDef<LanguageType>[] = [
    {
        accessorKey: "title",
        header: "Nom",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell language={row.original} />,
    },
];
