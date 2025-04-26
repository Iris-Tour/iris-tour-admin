import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, LockSlash, Trash, Unlock } from "iconsax-react";
import SuspendAdminForm from "@/components/forms/admins-management/SuspendAdminForm";
import DeleteAdminForm from "@/components/forms/admins-management/DeleteAdminForm";
import UpdateAdminForm from "@/components/forms/admins-management/UpdateAdminForm";
import { Trans } from "react-i18next";
import { FC } from "react";

interface ActionsCellProps {
    admin: UserData;
    adminRoles: Array<RoleType>;
    allRoles: Array<RoleType>;
}

const ActionsCell: FC<ActionsCellProps> = ({admin, adminRoles, allRoles}) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="roles-and-permissions.admins-list.actions.edit" />
                    </span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="roles-and-permissions.admins-list.update-admin-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateAdminForm
                        admin={admin}
                        adminRoles={adminRoles}
                        allRoles={allRoles ?? []}
                    />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger
                    className={`${
                        admin.isActive
                            ? "text-secondary hover:bg-secondary/10"
                            : "text-green-600 hover:bg-green-600/10"
                    } px-2 py-2 rounded-md cursor-pointer transition`}
                >
                    <span className="sr-only">
                        <Trans i18nKey="roles-and-permissions.admins-list.actions.suspend" />
                    </span>
                    {admin.isActive ? (
                        <LockSlash className="stroke-secondary w-5 h-5" />
                    ) : (
                        <Unlock className="stroke-green-600 w-5 h-5" />
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {admin.isActive ? (
                                <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.title1" />
                            ) : (
                                <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.title2" />
                            )}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <SuspendAdminForm admin={admin} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="roles-and-permissions.admins-list.actions.delete" />
                    </span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="roles-and-permissions.admins-list.delete-admin-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                        <DeleteAdminForm admin={admin} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ActionsCell;
