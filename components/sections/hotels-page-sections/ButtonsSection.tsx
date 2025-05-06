"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import Button2 from "@/components/buttons/Button2";
import { PlusCircle } from "lucide-react";
import { Trans } from "react-i18next";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddHotelForm from "@/components/forms/hotels/AddHotelForm";
import ExportPrintButtons from "@/components/buttons/ExportPrintButtons";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllHotels } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ButtonsSection = () => {
    const { token } = useAuth();
    const { data: hotelsResponse, isLoading } = useQuery({
        queryKey: ["get-all-hotels"],
        queryFn: () => apiGetAllHotels(token!),
    });

    const hotels = hotelsResponse ?? [];

    const columns = [
        { key: "name", header: "Nom" },
        { key: "description", header: "Description" },
        { key: "location", header: "Localisation" },
        { key: "contact", header: "Contact" },
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
                    {!isLoading && hotels.length > 0 && (
                        <ExportPrintButtons
                            data={hotels}
                            columns={columns}
                            fileName="hotels"
                            title="Liste des Hôtels"
                        />
                    )}
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                Créer un hôtel
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Créer un hôtel</DialogTitle>
                                <DialogDescription className="text-base"></DialogDescription>
                            </DialogHeader>
                            <AddHotelForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
