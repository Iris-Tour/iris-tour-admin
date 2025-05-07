"use client";

import { Edit2, Trash, Eye } from "iconsax-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import UpdateTourForm from "@/components/forms/tours/UpdateTourForm";
import DeleteTourForm from "@/components/forms/tours/DeleteTourForm";

interface ActionsCellProps {
    tour: TourType;
}

export default function ActionsCell({ tour }: ActionsCellProps) {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">Modifier l'excursion</span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Modifier l'excursion</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateTourForm tour={tour} />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">Supprimer l'excursion</span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer l'excursion</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DeleteTourForm tour={tour} />
                </DialogContent>
            </Dialog>
            <Link
                href={`/tours/${tour.id}`}
                className="text-secondary hover:bg-secondary/10 px-2 py-2 rounded-md cursor-pointer transition"
            >
                <span className="sr-only">Détails</span>
                <Eye className="stroke-secondary w-5 h-5" />
            </Link>
        </div>
    );
}
