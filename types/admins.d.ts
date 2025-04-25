type AdminWithRoles = { user: UserData; roles: Array<RoleType> };

type GetAllAdminsWithRolesPromise = {
    message: string;
    usersWithRoles: Array<AdminWithRoles>;
};

type StoreAdminMutation = {
    firstname: string;
    lastname: string;
    email: string;
    roles: Array<number>;
};

type StoreAdminPromise = {
    message: string;
};

type UpdateAdminMutation = {
    firstname: string;
    lastname: string;
    email: string;
    roles: Array<number>;
};

type UpdateAdminPromise = {
    message: string;
};

type SuspendAdminPromise = {
    message: string;
};
