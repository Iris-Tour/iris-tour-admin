import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "../../ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDeleteRole, apiGetRoleAdmins } from "@/lib/api";
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

    // Get the admins of the role
    const getRoleAdminsQuery = useQuery({
        queryKey: ["get-role-admins"],
        queryFn: () => apiGetRoleAdmins(token!, roleId),
    });

    const deleteRoleMutation = useMutation({
        mutationFn: (roleId: string) => apiDeleteRole(token!, roleId),
        onSuccess: () => {
            // Update roles list
            queryClient.invalidateQueries({
                queryKey: ["get-all-roles-with-permissions"],
            });

            // Update admins list
            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            // Get all roles
            queryClient.invalidateQueries({
                queryKey: ["get-all-roles"],
            });

            toast.success(
                <Trans
                    i18nKey="roles-and-permissions.deleteRoleDialog.success-messages.Role deleted successfully"
                    values={{ role: role }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: () => {
            toast.error("Une erreur est survenue.");
        },
    });

    const onSubmit = () => {
        // Verify if the role is assigned to any administrator
        if (
            getRoleAdminsQuery.data &&
            getRoleAdminsQuery.data.users.length > 0
        ) {
            toast.error(
                "Vous ne pouvez pas supprimer ce rôle car il est assigné à des administrateurs. Veuillez révoquer ce rôle à tous les administrateurs concernés avant de le supprimer."
            );
        } else {
            deleteRoleMutation.mutate(roleId);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="roles-and-permissions.deleteRoleDialog.description"
                        values={{ role: role }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        {t("roles-and-permissions.deleteRoleDialog.button1")}
                    </Button2>
                </DialogClose>

                <Button2
                    onClick={onSubmit}
                    disabled={deleteRoleMutation.isPending}
                >
                    {t("roles-and-permissions.deleteRoleDialog.button2")}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteRoleForm;
