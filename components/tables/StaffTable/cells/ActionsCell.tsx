import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Trash } from "iconsax-react";
import UpdateStaffForm from "@/components/forms/staff-management/UpdateStaffForm";
import { Trans } from "react-i18next";
import DeleteStaffForm from "@/components/forms/staff-management/DeleteStaffForm";

interface ActionsCellProps {
    staff: StaffType;
}

const ActionsCell: FC<ActionsCellProps> = ({staff}) => {
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
                    <UpdateStaffForm
                        staff={staff}
                    />
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
                        <DeleteStaffForm staff={staff} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ActionsCell;
