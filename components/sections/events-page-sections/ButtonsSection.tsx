"use client";

import Button2 from "@/components/buttons/Button2";
import Button3 from "@/components/buttons/Button3";
import SectionContainer from "@/components/containers/SectionContainer";
import AddEventForm from "@/components/forms/events/AddEventForm";
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
                <div className="flex items-center gap-4">
                    <Button3>
                        <Trans i18nKey={"events.export"} />
                        <DocumentUpload className="stroke-black" />
                    </Button3>
                    <Button3>
                        <Trans i18nKey={"events.print"} />
                        <Printer className="stroke-black" />
                    </Button3>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger className="cursor-pointer" asChild>
                            <Button2>
                                <PlusCircle />
                                <Trans i18nKey={"events.add-event"} />
                            </Button2>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans
                                        i18nKey={
                                            "events.add-event-dialog.title"
                                        }
                                    />
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    <Trans
                                        i18nKey={
                                            "events.add-event-dialog.description"
                                        }
                                    />
                                </DialogDescription>
                            </DialogHeader>
                            <AddEventForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ButtonsSection;
