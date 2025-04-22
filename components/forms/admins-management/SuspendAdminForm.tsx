import Button2 from "@/components/buttons/Button2";
import { DialogClose } from "@/components/ui/dialog";
import { FC } from "react";
import { Trans } from "react-i18next";

interface SuspendAdminFormProps {
    adminName: string;
    adminId: string;
}

const SuspendAdminForm: FC<SuspendAdminFormProps> = ({
    adminName,
    adminId,
}) => {
    const onSubmit = () => {};
    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.description"
                        values={{ adminName: adminName }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.button1" />
                    </Button2>
                </DialogClose>

                <Button2
                    onClick={onSubmit}
                    // disabled={deleteRoleMutation.isPending}
                >
                    <Trans i18nKey="roles-and-permissions.admins-list.suspend-admin-dialog.button2" />
                </Button2>
            </div>
        </div>
    );
};

export default SuspendAdminForm;
