"use client";

import SectionContainer from "@/components/containers/SectionContainer";
import Button2 from "@/components/buttons/Button2";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import AddStaffForm from "@/components/forms/staff-management/AddStaffForm";
import StaffTable from "@/components/tables/StaffTable";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllStaff } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const StaffTableSection = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [allStaff, setAllStaff] = useState<GetAllStaffPromise | undefined>(
        undefined
    );

    const getAllStaffQuery = useQuery({
        queryKey: ["get-all-staff"],
        queryFn: () => apiGetAllStaff(token!),
    });

    useEffect(() => {
        setAllStaff(getAllStaffQuery.data);
    }, [getAllStaffQuery]);

    return (
        <SectionContainer>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">
                        {t("manage-staff.staff-list.heading")}
                    </h2>
                    {/* <p className="max-w-xl">
                        {t("manage-staff.staff-list.subheading")}
                    </p> */}
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button2>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t("manage-staff.staff-list.add-staff")}
                        </Button2>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t("manage-staff.staff-list.add-staff")}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <AddStaffForm />
                    </DialogContent>
                </Dialog>
            </div>

            <StaffTable data={allStaff ?? []} />
        </SectionContainer>
    );
};

export default StaffTableSection;
