import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteEvent } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

interface DeleteEventFormProps {
    event: EventType;
}

const DeleteEventForm: FC<DeleteEventFormProps> = ({ event }) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const deleteEventMutation = useMutation({
        mutationFn: () => apiDeleteEvent(token!, event.id.toString()),
        onSuccess: () => {
            // Update events list
            queryClient.invalidateQueries({
                queryKey: ["get-all-events"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey="events.delete-event-dialog.success-messages.Event deleted successfully"
                    values={{ event: event.name }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        deleteEventMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="events.delete-event-dialog.description"
                        values={{ event: event.name }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t("events.delete-event-dialog.button1")}
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteEventMutation.isPending}
                >
                    {t("events.delete-event-dialog.button2")}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteEventForm;
