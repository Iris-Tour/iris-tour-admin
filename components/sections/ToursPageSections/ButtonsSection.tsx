"use client";

import Button2 from "@/components/buttons/Button2";
import Button3 from "@/components/buttons/Button3";
import SectionContainer from "@/components/containers/SectionContainer";
import AddTourForm from "@/components/forms/tours/AddTourForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { DocumentUpload, Printer } from "iconsax-react";
import { PlusCircle } from "lucide-react";
import { Trans } from "react-i18next";

const ButtonsSection = () => {
    return (
        <SectionContainer>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <Button3>
                        <Trans i18nKey={"tours.export"} />
                        <DocumentUpload className="stroke-black" />
                    </Button3>
                    <Button3>
                        <Trans i18nKey={"tours.print"} />
                        <Printer className="stroke-black" />
                    </Button3>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"tours.add-tour"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={"tours.add-tour-dialog.title"}
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    <Trans
                                        i18nKey={
                                            "tours.add-tour-dialog.description"
                                        }
                                    />
                                </DialogDescription>
                                <AddTourForm />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
