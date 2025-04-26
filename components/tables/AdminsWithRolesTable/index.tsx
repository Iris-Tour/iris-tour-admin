import React, { FC, useMemo } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllRoles } from "@/lib/api";

interface Props {
    data: AdminWithRoles[];
}

const Table: FC<Props> = ({ data }) => {
    const { token } = useAuth();

    const allRolesQuery = useQuery({
        queryKey: ["get-all-roles"],
        queryFn: () => apiGetAllRoles(token!),
    });

    const allRoles = allRolesQuery?.data?.roles ?? [];

    const columns = useMemo(() => getColumns(allRoles), [allRoles]);

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Table;
