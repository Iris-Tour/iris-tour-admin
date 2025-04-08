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
import Link from "next/link";
import Button1 from "@/components/buttons/Button1";
import { useTranslation } from "react-i18next";

const formSchema = z
    .object({
        password: z.string({
            required_error: "Veuillez entrer le mot de passe",
        }),
        passwordConfirmation: z.string({
            required_error: "Veuillez entrer le mot de passe",
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirmation"],
    });

const ChangePasswordForm = () => {
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: undefined,
            passwordConfirmation: undefined,
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-[clamp(16px,_2vw,_20px)]">
                                    {t("reset-password.change-password-form.field1.title")}
                                </FormLabel>
                                <FormControl>
                                    <Input1
                                        type="password"
                                        placeholder={t(
                                            "reset-password.change-password-form.field1.placeholder"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-[clamp(16px,_2vw,_20px)]">
                                        {t("reset-password.change-password-form.field2.title")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input1
                                            type="password"
                                            placeholder={t(
                                                "reset-password.change-password-form.field2.placeholder"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Link
                            className="self-end underline text-secondary-color-2"
                            href="/login"
                        >
                            {t("reset-password.change-password-form.loginLink")}
                        </Link>
                    </div>
                </div>
                <Button1
                    type="submit"
                    className="py-6 w-full"
                >
                        {t("reset-password.change-password-form.cta")}
                </Button1>
            </form>
        </Form>
    );
};

export default ChangePasswordForm;
