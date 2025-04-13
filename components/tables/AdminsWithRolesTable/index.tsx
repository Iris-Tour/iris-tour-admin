import React, { FC } from "react";
import { DataTable } from "@/components/tables/data-table";
import { AdminWithRoles, columns } from "./columns";

interface Props {
    data: AdminWithRoles[];
}

const AdminWithRolesTable: FC<Props> = ({ data }) => {
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default AdminWithRolesTable;
