"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import TouristicSitesTable from "@/components/tables/TouristicSitesTable";
import useAuth from "@/hooks/useAuth";
import { apiGetAllTouristicSites } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const TouristicSitesTableSection = () => {
    const { token } = useAuth();

    const [allTouristicSites, setAllTouristicSites] = useState<
        GetAllTouristicSitesPromise | undefined
    >(undefined);

    const getAllTouristicSites = useQuery({
        queryKey: ["get-all-touristic-sites"],
        queryFn: () => apiGetAllTouristicSites(token!),
    });

    useEffect(() => {
        setAllTouristicSites(getAllTouristicSites.data);
    }, [getAllTouristicSites]);

    return (
        <SectionContainer>
            <TouristicSitesTable data={allTouristicSites ?? []} />
        </SectionContainer>
    );
};

export default TouristicSitesTableSection;
