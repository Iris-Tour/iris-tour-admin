"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import EventsTable from "@/components/tables/EventsTable";
import useAuth from "@/hooks/useAuth";
import { apiGetAllEvents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EventsTableSection = () => {
    const { token } = useAuth();

    const [allEvents, setAllEvents] = useState<GetAllEventsPromise | undefined>(
        undefined
    );

    const getAllEvents = useQuery({
        queryKey: ["get-all-events"],
        queryFn: () => apiGetAllEvents(token!),
    });

    useEffect(() => {
        setAllEvents(getAllEvents.data);
    }, [getAllEvents]);

    console.log(getAllEvents.error);

    return (
        <SectionContainer>
            <EventsTable data={allEvents ?? []} />
        </SectionContainer>
    );
};

export default EventsTableSection;
