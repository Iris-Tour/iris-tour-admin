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
import UpdateRoleWithPermissionsForm from "../forms/UpdateRoleWithPermissionsForm";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import DeleteRoleForm from "../forms/DeleteRoleForm";

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
        <div className="flex bg-white w-fit gap-5 px-5 py-3 rounded-2xl">
            <h2 className="font-bold text-lg">{role}</h2>
            <Separator orientation="vertical" />
            <Popover>
                <PopoverTrigger className="text-primary-color hover:bg-primary-color/10 p-1 rounded-md cursor-pointer transition">
                    <Ellipsis className="w-4 h-4" />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col border-primary-color w-fit gap-2 shadow-lg">
                    <Dialog>
                        <DialogTrigger className="text-primary-color hover:bg-primary-color/5 px-3 py-1 rounded-md cursor-pointer transition">
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
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default RoleCard;
