"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import Button2 from "@/components/buttons/Button2";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trans } from "react-i18next";
import AddTouristicSiteForm from "@/components/forms/touristic-sites/AddTouristicSiteForm";
import ExportPrintButtons from "@/components/buttons/ExportPrintButtons";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllTouristicSites } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ButtonsSection = () => {
    const { token } = useAuth();
    const { data: touristicSitesResponse, isLoading } =
        useQuery<GetAllTouristicSitesPromise>({
            queryKey: ["get-all-touristic-sites"],
            queryFn: () => apiGetAllTouristicSites(token!),
        });

    const touristicSites = touristicSitesResponse || [];

    const columns = [
        { key: "name", header: "Nom" },
        { key: "description", header: "Description" },
        { key: "address", header: "Adresse" },
        { key: "category", header: "Catégorie" },
        {
            key: "schedule",
            header: "Horaires",
            render: (value: any) => {
                if (!value) return "Non spécifié";
                const schedule = Object.entries(value)
                    .map(([day, hours]) => `${day}: ${hours || "Fermé"}`)
                    .join(", ");
                return schedule;
            },
        },
        {
            key: "entranceFee",
            header: "Prix d'entrée",
            render: (value: string) => {
                if (!value) return "Non spécifié";
                return new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                }).format(Number(value));
            },
        },
        {
            key: "accessibilityForDisabled",
            header: "Accessibilité",
            render: (value: boolean) =>
                value ? "Accessible" : "Non accessible",
        },
        {
            key: "legalStatus",
            header: "Statut légal",
            render: (value: string) => value || "Non spécifié",
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
                <div className="flex items-center gap-4">
                    <ExportPrintButtons
                        data={touristicSites}
                        columns={columns}
                        fileName="sites-touristiques"
                        title="Liste des Sites Touristiques"
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"touristic-sites.add-site"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={
                                            "touristic-sites.add-site-dialog.title"
                                        }
                                    />
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <AddTouristicSiteForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
