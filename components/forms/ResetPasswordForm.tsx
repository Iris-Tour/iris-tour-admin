"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Input1 from "@/components/inputs/Input1";
import Button1 from "@/components/buttons/Button1";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
    email: z
        .string({ required_error: "Veuillez entrer le mail" })
        .email({ message: "Adresse mail invalide" }),
});

const ResetPasswordForm = () => {
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-[clamp(16px,_2vw,_20px)]">
                                    {t("reset-password.field1.title")}
                                </FormLabel>
                                <FormControl>
                                    <Input1
                                        placeholder={t(
                                            "reset-password.field1.placeholder"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button1
                    type="submit"
                    text={t("reset-password.cta")}
                    className="py-6 w-full"
                />
            </form>
        </Form>
    );
};

export default ResetPasswordForm;
