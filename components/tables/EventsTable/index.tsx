import React, { FC } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface Props {
    data: EventType[];
}

const Table: FC<Props> = ({ data }) => {
    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Table;
