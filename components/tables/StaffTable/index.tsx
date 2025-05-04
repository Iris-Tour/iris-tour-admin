import React, { FC } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";

interface Props {
    data: StaffType[];
}

const Table: FC<Props> = ({ data }) => {

    return (
        <div className="container mx-auto">
            <DataTable columns={getColumns()} data={data} />
        </div>
    );
};

export default Table;
