import { FC } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

interface RoleCardProps {
    role?: string;
}

const RoleCard: FC<RoleCardProps> = ({ role }) => {
    const { t } = useTranslation();
    return (
        <div className="flex bg-white w-fit gap-5 px-5 py-3 rounded-2xl">
            <h2 className="font-bold text-lg">{role}</h2>
            <Dialog>
                <DialogTrigger className="cursor-pointer">
                    {t("roles-and-permissions.role-card.update")}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RoleCard;
