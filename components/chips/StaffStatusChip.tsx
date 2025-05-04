import { FC } from "react";
import SimpleChip from "./SimpleChip";

interface Props {
    staff: StaffType;
}

const StaffStatusChip: FC<Props> = ({ staff }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <SimpleChip className={getStatusColor(staff.status)}>
            {staff.status}
        </SimpleChip>
    );
};

export default StaffStatusChip;
