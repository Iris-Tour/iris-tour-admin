import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Eye, LockSlash, Trash, Unlock } from "iconsax-react";
import { Trans } from "react-i18next";
import { FC } from "react";
import EventsStatusChip from "@/components/chips/EventsStatusChip";
import UpdateEventForm from "@/components/forms/events/UpdateEventForm";
import DeleteEventForm from "@/components/forms/events/DeleteEventForm";
import Link from "next/link";

interface ActionsCellProps {
    event: EventType;
}

const ActionsCell: FC<ActionsCellProps> = ({ event }) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">Modifier l'événement</span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Modifier l'événement</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <UpdateEventForm event={event} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">Supprimer l'événement</span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer l'événement</DialogTitle>
                        <DialogDescription></DialogDescription>
                        <DeleteEventForm event={event} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Link
                href={`/events/${event.id}`}
                className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition"
            >
                <span className="sr-only">
                    <Trans i18nKey="events.actions.view" />
                </span>
                <Eye className="stroke-secondary w-5 h-5" />
            </Link>
        </div>
    );
};

export default ActionsCell;
