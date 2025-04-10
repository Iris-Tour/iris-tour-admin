"use client";

import { useTranslation } from "react-i18next";
import RoleCard from "@/components/cards/RoleCard";
import AddButton from "@/components/buttons/AddButton";
import { PlusCircle } from "lucide-react";

const RolesAndPermissionsPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-7">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl">
                        {t("roles-and-permissions.heading")}
                    </h1>
                    <p className="max-w-xl">
                        {t("roles-and-permissions.subheading")}
                    </p>
                </div>
                <AddButton className="rounded-xl">
                    <PlusCircle /> Ajouter un rôle
                </AddButton>
            </div>
            <div className="flex flex-wrap gap-4">
                <RoleCard role="Admin" />
                <RoleCard role="User" />
            </div>
        </div>
    );
};

export default RolesAndPermissionsPage;
