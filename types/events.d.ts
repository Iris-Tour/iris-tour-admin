type StoreEventMutation = {
    name: string;
    description: string | null;
    startDateTime: string;
    endDateTime: string;
    location: string;
    category: string | null;
    organizer: string;
    ticketPrice: number;
    maximumCapacity: number;
    targetAudience: string | null;
    eventLanguages: Array<string> | null;
    accessibilityForDisabled: boolean | null;
    organizerContact: string;
    program: string | null;
    eventStatus: number;
};

type StoreEventPromise = {
    message: string;
};
