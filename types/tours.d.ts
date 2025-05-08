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
    staff: StaffType;
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
