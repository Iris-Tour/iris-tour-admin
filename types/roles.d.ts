type RolesWithPermissions = {
    role: RoleType;
    permissions: Array<PermissionType>;
};

type GetAllRolesPromise = {
    roles: RoleType[];
};

type GetRoleAdminsPromise = {
    message: string;
    users: Array<UserType>;
};
