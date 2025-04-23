import { FC } from "react";
import SimpleChip from "./SimpleChip";
import { statuses } from "@/constants/statuses";

interface ToursStatusChipProps {
    tour: TourType;
}

const TourStatusChip: FC<ToursStatusChipProps> = ({ tour }) => {
    return (
        <SimpleChip
            className={`${
                tour.status === 0
                    ? "bg-gray-100 text-foreground"
                    : tour.status === 1
                    ? "bg-green-600/70"
                    : tour.status === 2 && "bg-destructive/60"
            } shadow-md`}
        >
            {statuses[tour.status].label}
        </SimpleChip>
    );
};

export default TourStatusChip;
