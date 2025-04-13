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
import {
    apiGetAllAdminsWithRoles,
    apiGetAllRolesWithPermissions,
} from "@/lib/api";
import { useEffect, useState } from "react";
import AdminWithRolesTable from "../tables/AdminsWithRolesTable";

const RolesAndPermissionsPage = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [rolesWithPermissions, setRolesWithPermissions] = useState<
        GetAllRolesWithPermissionPromise | undefined
    >();
    const [adminsWithRoles, setAdminWithRoles] = useState<
        GetAllAdminsWithRolesPromise | undefined
    >();

    const allRolesWithPermissions = useQuery({
        queryKey: ["get-all-roles-with-permissions"],
        queryFn: () => apiGetAllRolesWithPermissions(token!),
    });

    const allAdminsWithRoles = useQuery({
        queryKey: ["get-all-admins-with-roles"],
        queryFn: () => apiGetAllAdminsWithRoles(token!),
    });

    useEffect(() => {
        setRolesWithPermissions(allRolesWithPermissions.data);
    }, [allRolesWithPermissions]);

    useEffect(() => {
        setAdminWithRoles(allAdminsWithRoles.data);
    }, [allAdminsWithRoles]);

    return (
        <>
            <section className="flex flex-col gap-7">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl">
                            {t("roles-and-permissions.heading")}
                        </h2>
                        <p className="max-w-xl">
                            {t("roles-and-permissions.subheading")}
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <IconLeftButton className="rounded-xl">
                                <PlusCircle />{" "}
                                {t("roles-and-permissions.addRole")}
                            </IconLeftButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {t(
                                        "roles-and-permissions.addRoleDialog.title"
                                    )}
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <AddRoleWithPermissionsForm />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex flex-wrap gap-4">
                    {rolesWithPermissions?.roles &&
                    rolesWithPermissions.roles.length > 0 ? (
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
            </section>
            <section className="flex flex-col gap-7">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl">
                            {t("roles-and-permissions.admins-list.heading")}
                        </h2>
                        <p className="max-w-xl">
                            {t("roles-and-permissions.admins-list.subheading")}
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <IconLeftButton className="rounded-xl">
                                <PlusCircle />{" "}
                                {t(
                                    "roles-and-permissions.admins-list.add-admin"
                                )}
                            </IconLeftButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {t(
                                        "roles-and-permissions.addRoleDialog.title"
                                    )}
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <AddRoleWithPermissionsForm />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <AdminWithRolesTable
                    data={adminsWithRoles?.usersWithRoles ?? []}
                />
            </section>
        </>
    );
};

export default RolesAndPermissionsPage;
