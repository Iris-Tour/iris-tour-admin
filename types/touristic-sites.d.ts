type TouristicSiteType = {
    id: number;
    name: string;
    description: string;
    address: string;
    category: string;
    schedule: {
        lundi: string;
        mardi: string;
        mercredi: string;
        jeudi: string;
        vendredi: string;
        samedi: string;
        dimanche: string;
    };
    entranceFee: string;
    accessibilityForDisabled: boolean;
    averageRating: number;
    mainImages: Array<{
        id: number;
        path: string;
        size: number;
        name: string;
        type: string;
    }>;
    legalStatus: string;
    createdAt: string;
    updatedAt: string;
    staffId: number;
    staff: StaffType;
};

type StoreTouristicSiteMutation = {
    name: string;
    description: string;
    address: string;
    category: string;
    schedule: {
        lundi: string;
        mardi: string;
        mercredi: string;
        jeudi: string;
        vendredi: string;
        samedi: string;
        dimanche: string;
    };
    entranceFee: string;
    accessibilityForDisabled: boolean;
    averageRating: number;
    mainImages: File[];
    legalStatus: string;
    staffId: number;
};

type GetAllTouristicSitesPromise = TouristicSiteType[];

type UpdateTouristicSiteMutation = {
    name: string;
    description: string;
    address: string;
    category: string;
    schedule: {
        lundi: string;
        mardi: string;
        mercredi: string;
        jeudi: string;
        vendredi: string;
        samedi: string;
        dimanche: string;
    };
    entranceFee: string;
    accessibilityForDisabled: boolean;
    averageRating: number;
    mainImages: File[];
    legalStatus: string;
    staffId: number;
};

type DeleteTouristicSitePromise = {
    message: string;
    status: string;
};

type StoreTouristicSitePromise = {
    message: string;
    status: string;
};

type UpdateTouristicSitePromise = {
    message: string;
    status: string;
};
