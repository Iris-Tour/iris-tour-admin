"use client";

import Button2 from "@/components/buttons/Button2";
import SectionContainer from "@/components/containers/SectionContainer";
import AddStaffForm from "@/components/forms/staff-management/AddStaffForm";
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
import { apiGetAllStaff } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { staffTypes } from "@/constants/staffTypes";

const ButtonsSection = () => {
    const { token } = useAuth();
    const { data: staff = [], isLoading } = useQuery({
        queryKey: ["get-all-staff"],
        queryFn: () => apiGetAllStaff(token!),
    });

    const columns = [
        {
            key: "user",
            header: "Nom complet",
            render: (value: any) => `${value.firstname} ${value.lastname}`,
        },
        {
            key: "user",
            header: "Email",
            render: (value: any) => value.email,
        },
        {
            key: "type",
            header: "Type",
            render: (value: number) => staffTypes[value].label,
        },
        {
            key: "phone",
            header: "Téléphone",
            render: (value: string) => value || "Non renseigné",
        },
        {
            key: "languages",
            header: "Langues parlées",
            render: (value: any[]) => {
                if (!value || value.length === 0) return "Non renseigné";
                return value.map((lang) => lang.language).join(", ");
            },
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
                        data={staff}
                        columns={columns}
                        fileName="personnel"
                        title="Liste du Personnel"
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"manage-staff.add-staff"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={
                                            "manage-staff.add-staff-dialog.title"
                                        }
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    <Trans
                                        i18nKey={
                                            "manage-staff.add-staff-dialog.description"
                                        }
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <AddStaffForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
