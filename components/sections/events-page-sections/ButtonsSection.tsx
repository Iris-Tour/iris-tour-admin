"use client";

import Button2 from "@/components/buttons/Button2";
import SectionContainer from "@/components/containers/SectionContainer";
import AddEventForm from "@/components/forms/events/AddEventForm";
import ExportPrintButtons from "@/components/buttons/ExportPrintButtons";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Trans } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllEvents } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ButtonsSection = () => {
    const { token } = useAuth();
    const { data: events = [], isLoading } = useQuery({
        queryKey: ["get-all-events"],
        queryFn: () => apiGetAllEvents(token!),
    });

    const columns = [
        { key: "name", header: "Nom" },
        { key: "description", header: "Description" },
        { key: "location", header: "Localisation" },
        { key: "category", header: "Catégorie" },
        {
            key: "startDateTime",
            header: "Date et heure de début",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy 'à' HH:mm", {
                    locale: fr,
                }),
        },
        {
            key: "endDateTime",
            header: "Date et heure de fin",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy 'à' HH:mm", {
                    locale: fr,
                }),
        },
        {
            key: "ticketPrice",
            header: "Prix du billet",
            render: (value: number) =>
                new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                }).format(value),
        },
        {
            key: "maximumCapacity",
            header: "Capacité maximale",
            render: (value: number) => `${value} personnes`,
        },
        {
            key: "targetAudience",
            header: "Public cible",
            render: (value: string) => value || "Non spécifié",
        },
        {
            key: "accessibilityForDisabled",
            header: "Accessibilité",
            render: (value: boolean) =>
                value ? "Accessible" : "Non accessible",
        },
        {
            key: "createdAt",
            header: "Date de création",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy", {
                    locale: fr,
                }),
        },
        {
            key: "updatedAt",
            header: "Dernière modification",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy", {
                    locale: fr,
                }),
        },
    ];

    return (
        <SectionContainer>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <ExportPrintButtons
                        data={events}
                        columns={columns}
                        fileName="evenements"
                        title="Liste des Événements"
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"events.add-event"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={
                                            "events.add-event-dialog.title"
                                        }
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    <Trans
                                        i18nKey={
                                            "events.add-event-dialog.description"
                                        }
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <AddEventForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
