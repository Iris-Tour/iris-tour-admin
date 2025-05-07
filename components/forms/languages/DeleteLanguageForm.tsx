"use client";

import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteLanguage } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import SpinningCircle from "@/components/spinners/SpinningCircle";

interface DeleteLanguageFormProps {
    language: LanguageType;
}

const DeleteLanguageForm: FC<DeleteLanguageFormProps> = ({ language }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const deleteLanguageMutation = useMutation({
        mutationFn: () => apiDeleteLanguage(token!, language.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-languages"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey="manage-languages.languages-list.delete-language-dialog.success-messages.Language deleted successfully"
                    values={{ language: language.title }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(<Trans i18nKey={`general-errors.${error}`} />);
            } else {
                toast.error(
                    <Trans
                        i18nKey={`manage-languages.languages-list.delete-language-dialog.error-messages.${error.message}`}
                    />
                );
            }
        },
    });

    const onSubmit = () => {
        deleteLanguageMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="manage-languages.languages-list.delete-language-dialog.description"
                        values={{ language: language.title }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t(
                            "manage-languages.languages-list.delete-language-dialog.button1"
                        )}
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteLanguageMutation.isPending}
                >
                    {deleteLanguageMutation.isPending ? (
                        <SpinningCircle />
                    ) : (
                        <Trans i18nKey="manage-languages.languages-list.delete-language-dialog.button2" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteLanguageForm;
