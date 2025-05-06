"use client";

import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteTouristicSite } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import SpinningCircle from "@/components/spinners/SpinningCircle";

interface DeleteTouristicSiteFormProps {
    site: TouristicSiteType;
}

const DeleteTouristicSiteForm: FC<DeleteTouristicSiteFormProps> = ({
    site,
}) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const deleteTouristicSiteMutation = useMutation({
        mutationFn: () => apiDeleteTouristicSite(token!, site.id.toString()),
        onSuccess: () => {
            // Update tourist sites list
            queryClient.invalidateQueries({
                queryKey: ["get-all-touristic-sites"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey="touristic-sites.delete-site-dialog.success-messages.Site deleted successfully"
                    values={{ site: site.name }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        deleteTouristicSiteMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="touristic-sites.delete-site-dialog.description"
                        values={{ site: site.name }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t("touristic-sites.delete-site-dialog.button1")}
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteTouristicSiteMutation.isPending}
                >
                    {deleteTouristicSiteMutation.isPending ? (
                        <SpinningCircle />
                    ) : (
                        <Trans i18nKey="touristic-sites.delete-site-dialog.button2" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteTouristicSiteForm;
