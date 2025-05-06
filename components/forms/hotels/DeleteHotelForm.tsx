"use client";

import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteHotel } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import SpinningCircle from "@/components/spinners/SpinningCircle";

interface DeleteHotelFormProps {
    hotel: HotelType;
}

const DeleteHotelForm: FC<DeleteHotelFormProps> = ({ hotel }) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const deleteHotelMutation = useMutation({
        mutationFn: () => apiDeleteHotel(token!, hotel.id.toString()),
        onSuccess: () => {
            // Update hotels list
            queryClient.invalidateQueries({
                queryKey: ["get-all-hotels"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey="hotels.delete-hotel-dialog.success-messages.Hotel deleted successfully"
                    values={{ hotel: hotel.name }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        deleteHotelMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="hotels.delete-hotel-dialog.description"
                        values={{ hotel: hotel.name }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t("hotels.delete-hotel-dialog.button1")}
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteHotelMutation.isPending}
                >
                    {deleteHotelMutation.isPending ? (
                        <SpinningCircle />
                    ) : (
                        <Trans i18nKey="hotels.delete-hotel-dialog.button2" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteHotelForm;
