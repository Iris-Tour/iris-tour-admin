"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllRolesWithPermissions } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import RolesSection from "@/components/sections/roles-and-permissions-page-sections/RolesSection";
import AdminsSection from "@/components/sections/roles-and-permissions-page-sections/AdminsSection";

const RolesAndPermissionsPage = () => {
    const { token } = useAuth();

    const [rolesWithPermissions, setRolesWithPermissions] = useState<
        GetAllRolesWithPermissionPromise | undefined
    >();

    const allRolesWithPermissions = useQuery({
        queryKey: ["get-all-roles-with-permissions"],
        queryFn: () => apiGetAllRolesWithPermissions(token!),
    });

    useEffect(() => {
        setRolesWithPermissions(allRolesWithPermissions.data);
    }, [allRolesWithPermissions]);

    return (
        <>
            <RolesSection rolesWithPermissions={rolesWithPermissions} />
            <AdminsSection rolesWithPermissions={rolesWithPermissions} />
        </>
    );
};

export default RolesAndPermissionsPage;
