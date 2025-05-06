"use client";

import Button2 from "@/components/buttons/Button2";
import SectionContainer from "@/components/containers/SectionContainer";
import AddTourForm from "@/components/forms/tours/AddTourForm";
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
import { apiGetAllTours } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ButtonsSection = () => {
    const { token } = useAuth();
    const { data: tours = [], isLoading } = useQuery({
        queryKey: ["get-all-tours"],
        queryFn: () => apiGetAllTours(token!),
    });

    const columns = [
        { key: "title", header: "Nom" },
        { key: "description", header: "Description" },
        { key: "departurePoint", header: "Point de départ" },
        { key: "arrivalPoint", header: "Point d'arrivée" },
        {
            key: "departureDateTime",
            header: "Date et heure de départ",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy 'à' HH:mm", {
                    locale: fr,
                }),
        },
        {
            key: "arrivalDateTime",
            header: "Date et heure d'arrivée",
            render: (value: string) =>
                format(new Date(value), "dd MMMM yyyy 'à' HH:mm", {
                    locale: fr,
                }),
        },
        {
            key: "excursionPrice",
            header: "Prix",
            render: (value: number) =>
                new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                }).format(value),
        },
        {
            key: "difficulty",
            header: "Difficulté",
            render: (value: number) => {
                const difficulties = ["Facile", "Moyen", "Difficile"];
                return difficulties[value - 1] || "Non spécifié";
            },
        },
        {
            key: "totalDistance",
            header: "Distance totale",
            render: (value: number) => `${value} km`,
        },
        {
            key: "maxParticipants",
            header: "Participants max",
            render: (value: number) => `${value} personnes`,
        },
        {
            key: "requiredEquipment",
            header: "Équipement requis",
            render: (value: string) => value || "Non spécifié",
        },
        {
            key: "status",
            header: "Statut",
            render: (value: number) => (value === 1 ? "Actif" : "Inactif"),
        },
        {
            key: "staff",
            header: "Guide",
            render: (value: any) => value?.name || "Non assigné",
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
                {!isLoading && tours.length > 0 && (
                    <ExportPrintButtons
                        data={tours}
                        columns={columns}
                        fileName="excursions"
                        title="Liste des Excursions"
                    />
                )}
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"tours.add-tour"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={"tours.add-tour-dialog.title"}
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    <Trans
                                        i18nKey={
                                            "tours.add-tour-dialog.description"
                                        }
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <AddTourForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
