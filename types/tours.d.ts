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
    mainImages: Array<{
        id: string;
        path: string;
        size: number;
        name: string;
        type: string;
    }>;
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
    mainImages: Array<File> | undefined;
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