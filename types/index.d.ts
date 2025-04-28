// Login types
type LoginMutation = {
    email: string;
    password: string;
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

// Role & Permissions types
type PermissionType = {
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

type RoleType = {
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

type GetAllRolesWithPermissionPromise = {
    message: string;
    roles: Array<{
        role: RoleType;
        permissions: Array<PermissionType>;
    }>;
};

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

type GetPermissionsOfRolePromise = {
    message: string;
    permissions: Array<{
        id: string;
        slug: string;
        title: string | null;
        entityType: string;
        entityId: string | null;
        scope: string;
        allowed: boolean;
        createdAt: string;
        updatedAt: string;
    }>;
};

type StoreRoleWithPermissionsMutation = {
    role: string;
    permissions: Array<string>;
};

type StoreRoleWithPermissionsPromise = {
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

type UpdateRoleWithPermissionsMutation = {
    role: string;
    permissions: Array<string>;
};

type UpdateRoleWithPermissionsPromise = {
    message: string;
    permissions_not_found: Array<string>;
};

type DeleteRolePromise = {
    message: "Role deleted successfully";
};

//-------- Tours types
type TourType = {
    id: number;
    title: string;
    description: string;
    duration: string;
    difficulty: number;
    totalDistance: number;
    excursionPrice: number;
    departureDateTime: string;
    departurePoint: string;
    arrivalDateTime: string;
    arrivalPoint: string;
    mainImages: (File | undefined)[];
    maxParticipants: number;
    requiredEquipment: string;
    assignedGuide: string;
    status: number;
    createdAt: string;
    updatedAt: string;
};

type GetAllToursPromise = Array<TourType>;

type StoreTourMutation = {
    title: string;
    description: string;
    difficulty: number;
    totalDistance: number;
    excursionPrice: number;
    departureDateTime: string;
    departurePoint: string;
    arrivalDateTime: string;
    arrivalPoint: string;
    maxParticipants: number;
    requiredEquipment: string;
    assignedGuide: string;
    status: number;
};

type StoreTourPromise = {
    message: string;
};

type UpdateTourMutation = {
    title: string;
    description: string;
    difficulty: number;
    totalDistance: number;
    excursionPrice: number;
    departureDateTime: string;
    departurePoint: string;
    arrivalDateTime: string;
    arrivalPoint: string;
    maxParticipants: number;
    requiredEquipment: string;
    assignedGuide: string;
    status: number;
};

type UpdateTourPromise = {
    message: string;
};

type DeleteTourPromise = {
    message: string;
};
//-------- End Tours types
