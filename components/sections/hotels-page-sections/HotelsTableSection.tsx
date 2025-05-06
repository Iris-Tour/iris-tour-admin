"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import Table from "@/components/tables/HotelsTable";
import useAuth from "@/hooks/useAuth";
import { apiGetAllHotels } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const HotelsTableSection = () => {
    const { token } = useAuth();

    const [allHotels, setAllHotels] = useState<GetAllHotelsPromise | undefined>(
        undefined
    );

    const getAllHotels = useQuery({
        queryKey: ["get-all-hotels"],
        queryFn: () => apiGetAllHotels(token!),
    });

    useEffect(() => {
        setAllHotels(getAllHotels.data);
    }, [getAllHotels]);

    return (
        <SectionContainer>
            <Table data={allHotels ?? []} />
        </SectionContainer>
    );
};

export default HotelsTableSection;
