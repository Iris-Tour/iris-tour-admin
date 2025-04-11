import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import IconLeftButton from "@/components/buttons/IconLeftButton";
import { DialogClose } from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteRole } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

interface DeleteRoleFormProps {
    role: string;
    roleId: string;
}

const DeleteRoleForm: FC<DeleteRoleFormProps> = ({ role, roleId }) => {
    const { t } = useTranslation();
    const { token } = useAuth();

    const queryClient = useQueryClient();

    const deleteRoleMutation = useMutation({
        mutationFn: (roleId: string) => apiDeleteRole(token!, roleId),
        onSuccess: () => {
            // Update roles list
            queryClient.invalidateQueries({ queryKey: ["get-all-roles"] });

            toast.success(
                <Trans
                    i18nKey="roles-and-permissions.deleteRoleDialog.success-messages.Role deleted successfully"
                    values={{ role: role }}
                    components={{ b: <b className="text-primary-color" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        deleteRoleMutation.mutate(roleId.toString());
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="roles-and-permissions.deleteRoleDialog.description"
                        values={{ role: role }}
                        components={{ b: <b className="text-primary-color" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <IconLeftButton className="text-primary-color hover:text-white bg-white hover:bg-primary-color">
                        {t("roles-and-permissions.deleteRoleDialog.cancel")}
                    </IconLeftButton>
                </DialogClose>

                <IconLeftButton onClick={() => onSubmit()}>
                    {t("roles-and-permissions.deleteRoleDialog.delete")}
                </IconLeftButton>
            </div>
        </div>
    );
};

export default DeleteRoleForm;
