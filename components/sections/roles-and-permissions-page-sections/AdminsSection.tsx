"use client";

import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
    apiGetAllAdminsWithRoles,
} from "@/lib/api";
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
import AdminWithRolesTable from "@/components/tables/AdminsWithRolesTable";
import AddAdminForm from "@/components/forms/admins-management/AddAdminForm";
import SectionContainer from "@/components/containers/SectionContainer";

interface AdminsSectionProps {
    rolesWithPermissions: GetAllRolesWithPermissionPromise | undefined
}

const AdminsSection: FC<AdminsSectionProps> = ({rolesWithPermissions}) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [adminsWithRoles, setAdminWithRoles] = useState<
        GetAllAdminsWithRolesPromise | undefined
    >();
    
    const allAdminsWithRoles = useQuery({
        queryKey: ["get-all-admins-with-roles"],
        queryFn: () => apiGetAllAdminsWithRoles(token!),
    });

    useEffect(() => {
        setAdminWithRoles(allAdminsWithRoles.data);
    }, [allAdminsWithRoles]);

  return (
    <SectionContainer>
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
                            <Button2 className="rounded-xl">
                                <PlusCircle />{" "}
                                {t(
                                    "roles-and-permissions.admins-list.add-admin"
                                )}
                            </Button2>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {t(
                                        "roles-and-permissions.admins-list.add-admin-dialog.title"
                                    )}
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <AddAdminForm roles={rolesWithPermissions?.roles} />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <AdminWithRolesTable
                    data={adminsWithRoles?.usersWithRoles ?? []}
                />
            </SectionContainer>
  )
}

export default AdminsSection