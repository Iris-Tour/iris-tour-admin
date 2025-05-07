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
import AddLanguageForm from "@/components/forms/languages/AddLanguageForm";
import LanguagesTable from "@/components/tables/LanguagesTable";
import { useQuery } from "@tanstack/react-query";
import { apiGetAllLanguages } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const LanguagesTableSection = () => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const [allLanguages, setAllLanguages] = useState<
        GetAllLanguagesPromise | undefined
    >(undefined);

    const getAllLanguagesQuery = useQuery({
        queryKey: ["get-all-languages"],
        queryFn: () => apiGetAllLanguages(token!),
    });

    useEffect(() => {
        setAllLanguages(getAllLanguagesQuery.data);
    }, [getAllLanguagesQuery]);

    return (
        <SectionContainer>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">
                        {t("manage-languages.languages-list.title")}
                    </h2>
                    <p className="max-w-xl text-muted-foreground">
                        {t("manage-languages.languages-list.subheading")}
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button2>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t(
                                "manage-languages.languages-list.add-language-dialog.trigger"
                            )}
                        </Button2>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t(
                                    "manage-languages.languages-list.add-language-dialog.title"
                                )}
                            </DialogTitle>
                            <DialogDescription>
                                {t(
                                    "manage-languages.languages-list.add-language-dialog.description"
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <AddLanguageForm />
                    </DialogContent>
                </Dialog>
            </div>

            <LanguagesTable data={allLanguages ?? []} />
        </SectionContainer>
    );
};

export default LanguagesTableSection;
