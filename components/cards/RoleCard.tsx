import { FC, useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import UpdateRoleWithPermissionsForm from "../forms/roles/UpdateRoleWithPermissionsForm";
import DeleteRoleForm from "../forms/roles/DeleteRoleForm";
import EllipsisPopover from "../popovers/EllipsisPopover";

interface RoleCardProps {
    role: string;
    roleId: string;
    rolePermissions: Array<PermissionType>;
}

const RoleCard: FC<RoleCardProps> = ({ role, roleId, rolePermissions }) => {
    const { t } = useTranslation();

    const [rolePermissionsIds, setRolePermissionsIds] = useState<
        string[] | undefined
    >();

    useEffect(() => {
        const ids =
            rolePermissions && rolePermissions.length > 0
                ? rolePermissions.map((permission) => permission.id)
                : [];

        setRolePermissionsIds(ids);
    }, [rolePermissions]);

    return (
        <div className="flex border border-primary/15 bg-white w-fit gap-5 px-5 py-3 rounded-2xl shadow-lg">
            <h2 className="font-bold text-lg">{role}</h2>
            <Separator orientation="vertical" />
            <EllipsisPopover>
                <Dialog>
                    <DialogTrigger className="text-primary hover:bg-primary/5 px-3 py-1 rounded-md cursor-pointer transition">
                        {t("roles-and-permissions.role-card.update")}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{role}</DialogTitle>
                            <DialogDescription></DialogDescription>
                            <UpdateRoleWithPermissionsForm
                                role={role}
                                roleId={roleId}
                                rolePermissionsIds={rolePermissionsIds}
                            />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger className="text-red-600 hover:bg-red-600/10 px-3 py-1 rounded-md cursor-pointer transition">
                        {t("roles-and-permissions.role-card.delete")}
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t(
                                    "roles-and-permissions.deleteRoleDialog.title"
                                )}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                            <DeleteRoleForm role={role} roleId={roleId} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </EllipsisPopover>
        </div>
    );
};

export default RoleCard;
