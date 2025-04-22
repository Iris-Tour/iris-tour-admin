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

// Admins
type GetAllAdminsWithRolesPromise = {
    message: string;
    usersWithRoles: Array<{ user: UserData; roles: Array<RoleType> }>;
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

// Tours types
type GetAllToursPromise = {
    id: number;
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00:00";
    difficulty: "easy";
    totalDistance: "8.50";
    excursionPrice: "25.00";
    departureDate: "2025-04-20";
    departureTime: "08:30:00";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    mainImages: [];
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
    createdAt: "2025-04-17T14:16:25.959+00:00";
    updatedAt: "2025-04-17T14:16:25.959+00:00";
};

type StoreTourMutation = {
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00";
    difficulty: "easy";
    totalDistance: 8.5;
    excursionPrice: 25;
    departureDate: "2025-04-20";
    departureTime: "08:30";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
};

type StoreTourPromise = {
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00";
    difficulty: "easy";
    totalDistance: 8.5;
    excursionPrice: 25;
    departureDate: "2025-04-20";
    departureTime: "08:30";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
};

type UpdateTourMutation = {
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00";
    difficulty: "easy";
    totalDistance: 8.5;
    excursionPrice: 25;
    departureDate: "2025-04-20";
    departureTime: "08:30";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
};

type UpdateTourPromise = {
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00";
    difficulty: "easy";
    totalDistance: 8.5;
    excursionPrice: 25;
    departureDate: "2025-04-20";
    departureTime: "08:30";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
};

type DeleteTourPromise = {
    title: "Randonnée en montagne";
    description: "Une randonnée tranquille dans les montagnes du Jura.";
    duration: "03:00";
    difficulty: "easy";
    totalDistance: 8.5;
    excursionPrice: 25;
    departureDate: "2025-04-20";
    departureTime: "08:30";
    departurePoint: "Parking des Rousses";
    arrivalPoint: "Sommet de la Dôle";
    maxParticipants: 15;
    requiredEquipment: "Chaussures de randonnée";
    assignedGuide: "guide_001";
    recommendedLevel: "Débutant";
};
