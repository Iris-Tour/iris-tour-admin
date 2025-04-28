import { FC } from "react";
import SimpleChip from "./SimpleChip";
import { statuses } from "@/constants/statuses";

interface AdminsStatusChipProps {
    admin: AdminType;
}

const AdminsStatusChip: FC<AdminsStatusChipProps> = ({ admin }) => {
    return (
        <SimpleChip
            className={`${
                admin.isActive
                    ? "bg-green-600/10 text-green-600"
                    : "bg-destructive/10 text-destructive"
            } shadow-md`}
        >
            {admin.isActive ? "Actif" : "Bloqué"}
        </SimpleChip>
    );
};

export default AdminsStatusChip;
