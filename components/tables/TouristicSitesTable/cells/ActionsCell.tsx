"use client";

import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Eye, Trash } from "iconsax-react";
import { Trans } from "react-i18next";
import Link from "next/link";
import UpdateTouristicSiteForm from "@/components/forms/touristic-sites/UpdateTouristicSiteForm";
import DeleteTouristicSiteForm from "@/components/forms/touristic-sites/DeleteTouristicSiteForm";

interface ActionsCellProps {
    site: TouristicSiteType;
}

const ActionsCell: FC<ActionsCellProps> = ({ site }) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="touristic-sites.actions.edit" />
                    </span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="touristic-sites.update-touristic-site-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateTouristicSiteForm site={site} />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="touristic-sites.actions.delete" />
                    </span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="touristic-sites.delete-site-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DeleteTouristicSiteForm site={site} />
                </DialogContent>
            </Dialog>
            <Link
                href={`/touristic-sites/${site.id}`}
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
