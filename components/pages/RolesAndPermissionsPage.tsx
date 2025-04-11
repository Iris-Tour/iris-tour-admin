"use client";

import { useTranslation } from "react-i18next";
import RoleCard from "@/components/cards/RoleCard";
import IconLeftButton from "@/components/buttons/IconLeftButton";
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
import { apiGetAllRolesWithPermissions } from "@/lib/api";
import { useEffect, useState } from "react";

const RolesAndPermissionsPage = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [rolesWithPermissions, setRolesWithPermissions] = useState<
        GetAllRolesWithPermissionPromise | undefined
    >();

    const { data: allRolesWithPermissions, isSuccess } = useQuery({
        queryKey: ["get-all-roles-with-permissions"],
        queryFn: () => apiGetAllRolesWithPermissions(token!),
    });

    useEffect(() => {
        setRolesWithPermissions(allRolesWithPermissions);
    }, [isSuccess, allRolesWithPermissions]);

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
                        <IconLeftButton className="rounded-xl">
                            <PlusCircle /> {t("roles-and-permissions.addRole")}
                        </IconLeftButton>
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
                {rolesWithPermissions?.roles && rolesWithPermissions.roles.length > 0 ? (
                    rolesWithPermissions.roles.map((role) => (
                        <RoleCard
                            key={role.role.id}
                            role={role.role.slug}
                            roleId={role.role.id}
                            rolePermissions={role.permissions}
                        />
                    ))
                ) : (
                    <p>Aucun rôle trouvé</p>
                )}
            </div>
        </div>
    );
};

export default RolesAndPermissionsPage;
