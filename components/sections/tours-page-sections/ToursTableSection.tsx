"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import ToursTable from "@/components/tables/ToursTable";
import useAuth from "@/hooks/useAuth";
import { apiGetAllTours } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ToursTableSection = () => {
    const { token } = useAuth();

    const [allTours, setAllTours] = useState<GetAllToursPromise | undefined>(
        undefined
    );

    const getAllTours = useQuery({
        queryKey: ["get-all-tours"],
        queryFn: () => apiGetAllTours(token!),
    });

    useEffect(() => {
        setAllTours(getAllTours.data);
    }, [getAllTours]);

    return (
        <SectionContainer>
            <ToursTable data={allTours ?? []} />
        </SectionContainer>
    );
};

export default ToursTableSection;
