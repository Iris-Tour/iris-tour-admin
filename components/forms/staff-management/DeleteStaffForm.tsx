import Button2 from "@/components/buttons/Button2";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import { DialogClose } from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import { apiDeleteStaff } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { Trans } from "react-i18next";
import { toast } from "sonner";

interface DeleteStaffFormProps {
    staff: StaffType;
}

const DeleteStaffForm: FC<DeleteStaffFormProps> = ({ staff }) => {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const staffName = staff.name;

    const deleteStaffMutation = useMutation({
        mutationFn: () => apiDeleteStaff(token!, staff.id.toString()),
        onSuccess: (data: any) => {
            // Update staff list
            queryClient.invalidateQueries({
                queryKey: ["get-all-staff"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey={`manage-staff.staff-list.delete-staff-dialog.success-messages.${data.message}`}
                    values={{ staffName: staffName }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(<Trans i18nKey={`general-errors.${error}`} />);
            } else {
                toast.error(
                    <Trans
                        i18nKey={`manage-staff.staff-list.delete-staff-dialog.error-messages.${error.message}`}
                    />
                );
            }
        },
    });

    const onSubmit = () => {
        deleteStaffMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-5">
            <div>
                <p>
                    <Trans
                        i18nKey="manage-staff.staff-list.delete-staff-dialog.description"
                        values={{ staffName: staffName }}
                        components={{ b: <b className="text-primary" /> }}
                    />
                </p>
            </div>
            <div className="flex items-center justify-end gap-3">
                <DialogClose asChild>
                    <Button2 className="text-primary hover:text-white bg-white hover:bg-primary">
                        <Trans i18nKey="manage-staff.staff-list.delete-staff-dialog.button1" />
                    </Button2>
                </DialogClose>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    onClick={onSubmit}
                    disabled={deleteStaffMutation.isPending}
                >
                    {deleteStaffMutation.isPending ? (
                        <SpinningCircle />
                    ) : (
                        <Trans i18nKey="manage-staff.staff-list.delete-staff-dialog.button2" />
                    )}
                </Button2>
            </div>
        </div>
    );
};

export default DeleteStaffForm;
