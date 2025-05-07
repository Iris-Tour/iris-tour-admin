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
import { Trans } from "react-i18next";
import UpdateLanguageForm from "@/components/forms/languages/UpdateLanguageForm";
import DeleteLanguageForm from "@/components/forms/languages/DeleteLanguageForm";

interface ActionsCellProps {
    language: LanguageType;
}

const ActionsCell: FC<ActionsCellProps> = ({ language }) => {
    return (
        <div className="flex items-center gap-3">
            <Dialog>
                <DialogTrigger className="text-primary hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="manage-languages.languages-list.actions.edit" />
                    </span>
                    <Edit2 className="stroke-primary w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="manage-languages.languages-list.update-language-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <UpdateLanguageForm language={language} />
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger className="text-red-500 hover:bg-red-500/10 px-2 py-2 rounded-md cursor-pointer transition">
                    <span className="sr-only">
                        <Trans i18nKey="manage-languages.languages-list.actions.delete" />
                    </span>
                    <Trash className="stroke-red-500 w-5 h-5" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey="manage-languages.languages-list.delete-language-dialog.title" />
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DeleteLanguageForm language={language} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ActionsCell;
