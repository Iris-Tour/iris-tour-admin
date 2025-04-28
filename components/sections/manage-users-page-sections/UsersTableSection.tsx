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
import AddUserForm from "@/components/forms/users-management/AddUserForm";
import UsersTable from "@/components/tables/UsersTable";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllUsers } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const UsersTableSection = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [allUsers, setAllUsers] = useState<GetAllUsersPromise | undefined>(undefined);

    const getAllUsersQuery = useQuery({
        queryKey: ["get-all-users"],
        queryFn: () => apiGetAllUsers(token!),
    });

    useEffect(() => {
        setAllUsers(getAllUsersQuery.data)
    }, [])

    return (
        <SectionContainer>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">
                        {t("manage-users.users-list.heading")}
                    </h2>
                    {/* <p className="max-w-xl">
                            {t("manage-users.users-list.subheading")}
                        </p> */}
                </div>

                <Dialog>
                    <DialogTrigger className="cursor-pointer" asChild>
                        <Button2 className="rounded-xl">
                            <PlusCircle />{" "}
                            {t("manage-users.users-list.add-user")}
                        </Button2>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t(
                                    "manage-users.users-list.add-user-dialog.title"
                                )}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                            <AddUserForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <UsersTable data={allUsers ?? []} />
        </SectionContainer>
    );
};

export default UsersTableSection;
