import Button2 from "@/components/buttons/Button2";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import { DialogClose } from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import { apiSuspendAdmin } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { Trans } from "react-i18next";
import { toast } from "sonner";

interface SuspendUserFormProps {
    user: UserType;
}

const SuspendUserForm: FC<SuspendUserFormProps> = ({ user }) => {
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const userName = `${user.firstname} ${user.lastname}`;

    const suspendAdminMutation = useMutation({
        mutationFn: () => apiSuspendAdmin(token!, user.id.toString()),
        onSuccess: (data: any) => {
            // Update users list
            queryClient.invalidateQueries({
                queryKey: ["get-all-users"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey={`manage-users.users-list.suspend-user-dialog.success-messages.${data.message}`}
                    values={{ userName: userName }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: (error: any) => {
            toast.error(
                <Trans
                    i18nKey={`manage-users.users-list.suspend-user-dialog.error-messages.${error.message}`}
                />
            );
        },
    });

    const onSubmit = () => {
        // suspendAdminMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    {user.isActive ? (
                        <Trans
                            i18nKey="manage-users.users-list.suspend-user-dialog.description1"
                            values={{ userName: userName }}
                            components={{ b: <b className="text-primary" /> }}
                        />
                    ) : (
                        <Trans
                            i18nKey="manage-users.users-list.suspend-user-dialog.description2"
                            values={{ userName: userName }}
                            components={{ b: <b className="text-primary" /> }}
                        />
                    )}
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        <Trans i18nKey="manage-users.users-list.suspend-user-dialog.button1" />
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={suspendAdminMutation.isPending}
                >
                    {suspendAdminMutation.isPending ? (
                        <SpinningCircle />
                    ) : user.isActive ? (
                        <Trans i18nKey="manage-users.users-list.suspend-user-dialog.button2" />
                    ) : (
                        <Trans i18nKey="manage-users.users-list.suspend-user-dialog.unblock" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default SuspendUserForm;
