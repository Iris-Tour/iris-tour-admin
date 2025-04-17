"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import Input1 from "@/components/inputs/Input1";
import { DialogClose } from "@/components/ui/dialog";
import Button2 from "@/components/buttons/Button2";

const formSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(1, { message: "Une description est requise." }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AddTourForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    function onSubmit(values: FormSchemaType) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field1.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "tours.add-tour-dialog.field1.placeholder"
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field2.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "tours.add-tour-dialog.field2.placeholder"
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    type="submit"
                    // disabled={}
                >
                    {t("tours.add-tour-dialog.cta")}
                </Button2>
            </form>
        </Form>
    );
};

export default AddTourForm;
