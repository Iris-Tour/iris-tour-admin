import { FC, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import Button2 from "@/components/buttons/Button2";
import { UseMutationResult } from "@tanstack/react-query";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import { cn } from "@/lib/utils";

interface SharedFormProps {
    form: UseFormReturn<any> | any;
    onSubmit: (data: any) => void;
    mutation: UseMutationResult<any> | any;
    children?: ReactNode;
    className?: string;
    ctaText?: string;
    multipart?: boolean;
}

const SharedForm: FC<SharedFormProps> = ({
    form,
    onSubmit,
    mutation,
    children,
    className,
    ctaText = "CTA",
    multipart = false,
}) => {
    const encType = multipart
        ? "multipart/form-data"
        : "application/x-www-form-urlencoded";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType={encType}>
                <div className={cn("flex flex-col gap-5", className)}>
                    {children}
                    <DialogClose id="dialog-close"></DialogClose>
                    <Button2 type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? <SpinningCircle /> : ctaText}
                    </Button2>
                </div>
            </form>
        </Form>
    );
};

export default SharedForm;
