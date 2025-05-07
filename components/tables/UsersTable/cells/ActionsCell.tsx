import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, LockSlash, Trash, Unlock } from "iconsax-react";
import { Trans } from "react-i18next";
import { FC } from "react";
import SuspendUserForm from "@/components/forms/users-management/SuspendUserForm";
import DeleteUserForm from "@/components/forms/users-management/DeleteUserForm";
import Link from "next/link";

interface ActionsCellProps {
    user: UserType;
}

const ActionsCell: FC<ActionsCellProps> = ({ user }) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger
                    className={`${
                        user.isActive
                            ? "text-secondary hover:bg-secondary/10"
                            : "text-green-600 hover:bg-green-600/10"
                    } px-2 py-2 rounded-md cursor-pointer transition`}
                >
                    <span className="sr-only">
                        <Trans i18nKey="manage-users.users-list.actions.suspend" />
                    </span>
                    {user.isActive ? (
                        <LockSlash className="stroke-secondary w-5 h-5" />
                    ) : (
                        <Unlock className="stroke-green-600 w-5 h-5" />
                    )}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {user.isActive ? (
                                <Trans i18nKey="manage-users.users-list.suspend-user-dialog.title1" />
                            ) : (
                                <Trans i18nKey="manage-users.users-list.suspend-user-dialog.title2" />
                            )}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <SuspendUserForm user={user} />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="manage-users.users-list.actions.delete" />
                    </span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="manage-users.users-list.delete-user-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DeleteUserForm user={user} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ActionsCell;
