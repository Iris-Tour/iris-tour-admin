type TourType = {
    id: number;
    title: string;
    description: string;
    difficulty: number;
    totalDistance: number;
    excursionPrice: number;
    departureDateTime: string;
    departurePoint: string;
    arrivalDateTime: string;
    arrivalPoint: string;
    mainImages: Array<{
        id: number;
        path: string;
        size: number;
        name: string;
        type: string;
    }>;
    maxParticipants: number;
    requiredEquipment: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    staffId: number;
    staff: {
        id: number;
        name: string;
        type: number;
        phone: string;
        email: string;
        imagePath: Array<{
            id: number;
            path: string;
            size: number;
            name: string;
            type: string;
        }>;
        languages: Array<{
            order: number;
            language: string;
        }>;
        address: string;
        createdAt: string;
        updatedAt: string;
    };
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
    mainImages: Array<File> | undefined;
    staffId: number;
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
    mainImages: Array<File> | undefined;
    staffId: number;
    status: number;
};

type UpdateTourPromise = {
    message: string;
};

type DeleteTourPromise = {
    message: string;
};
