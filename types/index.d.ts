// Login types
type LoginMutation = {
    email: string;
    password: string;
};

type UserData = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    emailVerificationToken: string;
    emailVerificationTokenExpiresAt: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
};

type TokenData = {
    type: string;
    name: string | null;
    token: string;
    abilities: Array<string>;
    lastUsedAt: string | null;
    expiresAt: string | null;
};

type LoginError = {
    message: string;
    error: {
        name: string;
        status: number;
        code: string;
        identifier: string;
    };
};

type GetCurrentUser = {
    token: string | undefined;
};

// Reset password types
type ResetPasswordMutation = {
    email: string;
};

type ResetPasswordPromise = {
    message: string;
};

// Change password types
type ChangePasswordMutation = {
    password: string;
    passwordConfirmation: string;
};

type ChangePasswordPromise = {
    message: string;
};

// Roles types
type GetAllRolesPromise = {
    id: string;
    slug: string;
    title: string | null;
    entityType: string;
    entityId: string | null;
    scope: string;
    allowed: true;
    createdAt: string;
    updatedAt: string;
};

// Permissions types
type GetAllPermissionsPromise = {
    id: string;
    slug: string;
    title: string | null;
    entityType: string;
    entityId: string | null;
    scope: string;
    allowed: boolean;
    createdAt: string;
    updatedAt: string;
};

type storeRoleWithPermissionsMutation = {
    role: string;
    permissions: Array<string>;
};

type storeRoleWithPermissionsPromise = {
    message: string;
    role: {
        slug: string;
        scope: string;
        createdAt: string;
        updatedAt: string;
        id: string;
    };
    permissions_not_found: Array<number>;
};
