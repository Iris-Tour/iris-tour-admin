"use client";

import { useTranslation } from "react-i18next";
import RoleCard from "@/components/cards/RoleCard";
import AddButton from "@/components/buttons/AddButton";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddRoleWithPermissionsForm from "@/components/forms/AddRoleWithPermissionsForm";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllRoles } from "@/lib/api";
import { useEffect, useState } from "react";

const RolesAndPermissionsPage = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [roles, setRoles] = useState<GetAllRolesPromise[] | undefined>([]);

    const { data: allRoles, isSuccess } = useQuery({
        queryKey: ["get-all-roles"],
        queryFn: () => apiGetAllRoles(token!),
    });

    useEffect(() => {
        setRoles(allRoles);
    }, [isSuccess, allRoles]);

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

                <Dialog>
                    <DialogTrigger className="cursor-pointer" asChild>
                        <AddButton className="rounded-xl">
                            <PlusCircle /> {t("roles-and-permissions.addRole")}
                        </AddButton>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t("roles-and-permissions.addRoleDialog.title")}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                            <AddRoleWithPermissionsForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-wrap gap-4">
                {roles && roles.length > 0 ? (
                    roles.map((role) => (
                        <RoleCard key={role.id} role={role.slug} />
                    ))
                ) : (
                    <p>Aucun rôle trouvé</p>
                )}
            </div>
        </div>
    );
};

export default RolesAndPermissionsPage;
