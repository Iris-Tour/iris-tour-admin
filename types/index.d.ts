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
