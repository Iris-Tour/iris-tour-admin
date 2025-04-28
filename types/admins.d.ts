type AdminType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    isActive: boolean;
    logCount: number;
};

type AdminWithRoles = { user: AdminType; roles: Array<RoleType> };

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

type DeleteAdminPromise = {
    message: string;
};
