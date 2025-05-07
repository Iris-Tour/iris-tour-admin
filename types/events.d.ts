type EventType = {
    id: number;
    name: string;
    description: string | null;
    startDateTime: string;
    endDateTime: string;
    location: string;
    category: string;
    staffId: number;
    ticketPrice: number;
    maximumCapacity: number;
    targetAudience: string;
    languages: Array<LanguageType>;
    accessibilityForDisabled: boolean;
    promotionalImage: Array<{
        id: string;
        path: string;
        size: number;
        name: string;
        type: string;
    }>;
    program: string;
    eventStatus: number;
    createdAt: string;
    updatedAt: string;
};

type GetAllEventsPromise = Array<EventType>;

type StoreEventMutation = {
    name: string;
    description: string | null;
    startDateTime: string;
    endDateTime: string;
    location: string;
    category: string | null;
    staffId: number;
    ticketPrice: number;
    maximumCapacity: number;
    targetAudience: string | null;
    languages: Array<string> | null;
    accessibilityForDisabled: boolean | null;
    program: string | null;
    eventStatus: number;
    promotionalImage: File[];
};

type StoreEventPromise = {
    message: string;
};

type UpdateEventMutation = {
    name: string;
    description: string | null;
    startDateTime: string;
    endDateTime: string;
    location: string;
    category: string | null;
    staffId: number;
    ticketPrice: number;
    maximumCapacity: number;
    targetAudience: string | null;
    languages: Array<string> | null;
    accessibilityForDisabled: boolean | null;
    program: string | null;
    eventStatus: number;
    promotionalImage: File[];
};

type UpdateEventPromise = {
    message: string;
};

type DeleteEventPromise = {
    message: string;
};
