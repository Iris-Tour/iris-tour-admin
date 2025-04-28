import Button2 from "@/components/buttons/Button2";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import { DialogClose } from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import { apiSuspendAdmin } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { Trans } from "react-i18next";
import { toast } from "sonner";

interface SuspendAdminFormProps {
    admin: AdminType;
}

const SuspendAdminForm: FC<SuspendAdminFormProps> = ({ admin }) => {
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const adminName = `${admin.firstname} ${admin.lastname}`;

    const suspendAdminMutation = useMutation({
        mutationFn: () => apiSuspendAdmin(token!, admin.id.toString()),
        onSuccess: (data: any) => {
            // Update admins list
            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey={`roles-and-permissions.admins-list.suspend-admin-dialog.success-messages.${data.message}`}
                    values={{ adminName: adminName }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: (error: any) => {
            toast.error(
                <Trans
                    i18nKey={`roles-and-permissions.admins-list.suspend-admin-dialog.error-messages.${error.message}`}
                />
            );
        },
    });

    const onSubmit = () => {
        suspendAdminMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    {admin.isActive ? (
                        <Trans
                            i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.description1"
                            values={{ adminName: adminName }}
                            components={{ b: <b className="text-primary" /> }}
                        />
                    ) : (
                        <Trans
                            i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.description2"
                            values={{ adminName: adminName }}
                            components={{ b: <b className="text-primary" /> }}
                        />
                    )}
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.button1" />
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={suspendAdminMutation.isPending}
                >
                    {suspendAdminMutation.isPending ? (
                        <SpinningCircle />
                    ) : admin.isActive ? (
                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.button2" />
                    ) : (
                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.unblock" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default SuspendAdminForm;
