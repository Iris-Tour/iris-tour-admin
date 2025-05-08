import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Eye, Trash } from "iconsax-react";
import Link from "next/link";
import { Trans } from "react-i18next";
import UpdateHotelForm from "@/components/forms/hotels/UpdateHotelForm";
import DeleteHotelForm from "@/components/forms/hotels/DeleteHotelForm";

const ActionsCell = ({ hotel }: { hotel: HotelType }) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="hotels.actions.edit" />
                    </span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="hotels.update-hotel-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateHotelForm hotel={hotel} />
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="hotels.actions.delete" />
                    </span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="hotels.delete-hotel-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DeleteHotelForm hotel={hotel} />
                </DialogContent>
            </Dialog>

            <Link
                href={`/manage-hotels/${hotel.id}`}
                className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition"
            >
                <span className="sr-only">
                    <Trans i18nKey="hotels.actions.view" />
                </span>
                <Eye className="stroke-secondary w-5 h-5" />
            </Link>
        </div>
    );
};

export default ActionsCell;
