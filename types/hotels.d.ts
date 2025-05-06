type HotelType = {
    id: number;
    name: string;
    description: string;
    location: string;
    accessibilityForDisabled: boolean;
    hotelImages: Array<{
        id: number;
        path: string;
        size: number;
        name: string;
        type: string;
    }>;
    contact: string;
    createdAt: string;
    updatedAt: string;
};

type StoreHotelMutation = {
    name: string;
    description: string;
    location: string;
    accessibilityForDisabled: boolean;
    contact: string;
    hotelImages: File[];
};

type UpdateHotelMutation = {
    name: string;
    description: string;
    location: string;
    accessibilityForDisabled: boolean;
    contact: string;
    hotelImages: File[];
};

type DeleteHotelMutation = {
    id: number;
};

type GetAllHotelsPromise = HotelType[];

type GetHotelByIdPromise = HotelType;

type StoreHotelPromise = {
    data: HotelType;
};

type UpdateHotelPromise = {
    data: HotelType;
};

type DeleteHotelPromise = {
    data: HotelType;
};

type GetAllHotelImagesPromise = HotelImageType[];
