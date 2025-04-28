import { FC } from "react";
import SimpleChip from "./SimpleChip";
import { statuses } from "@/constants/statuses";

interface EventsStatusChipProps {
    event: EventType;
}

const EventsStatusChip: FC<EventsStatusChipProps> = ({ event }) => {
    return (
        <SimpleChip
            className={`${
                event.eventStatus === 0
                    ? "bg-gray-100 text-foreground"
                    : event.eventStatus === 1
                    ? "bg-green-600/70"
                    : event.eventStatus === 2 && "bg-destructive/60"
            } shadow-md`}
        >
            {statuses[event.eventStatus].label}
        </SimpleChip>
    );
};

export default EventsStatusChip;
