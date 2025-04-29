import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteTour } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

interface DeleteTourFormProps {
    tour: TourType;
}

const DeleteTourForm: FC<DeleteTourFormProps> = ({ tour }) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const deleteTourMutation = useMutation({
        mutationFn: () => apiDeleteTour(token!, tour.id.toString()),
        onSuccess: () => {
            // Update tours list
            queryClient.invalidateQueries({
                queryKey: ["get-all-tours"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey="tours.delete-tour-dialog.success-messages.Tour deleted successfully"
                    values={{ tour: tour.title }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        deleteTourMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="tours.delete-tour-dialog.description"
                        values={{ tour: tour.title }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t("tours.delete-tour-dialog.button1")}
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteTourMutation.isPending}
                >
                    {t("tours.delete-tour-dialog.button2")}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteTourForm;
