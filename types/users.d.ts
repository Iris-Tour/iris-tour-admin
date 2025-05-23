type UserType = {
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

type GetAllUsersPromise = Array<UserType>;

type StoreUserMutation = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

type StoreUserPromise = {
    message: string;
};

type SuspendUserPromise = {
    message: string;
};

type DeleteUserPromise = {
    message: string;
};

type VerifyUserEmailPromise = {
    message: string;
};

type ResendEmailVerificationMutation = {
    email: string;
};

type ResendEmailVerificationPromise = {
    message: string;
};
