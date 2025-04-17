import React, { FC } from "react";
import { DataTable } from "@/components/tables/AdminsWithRolesTable/data-table";
import { AdminWithRoles, columns } from "./columns";

interface Props {
    data: AdminWithRoles[];
}

const Table: FC<Props> = ({ data }) => {
    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Table;
