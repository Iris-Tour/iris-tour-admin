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

const formSchema = z.object({
    email: z
        .string({ required_error: "Veuillez entrer le mail" })
        .email({ message: "Adresse mail invalide" }),
    password: z.string({ required_error: "Veuillez entrer le mot de passe" }),
});

const LoginForm = () => {
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
            password: undefined,
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
                                    {t("login.field1.title")}
                                </FormLabel>
                                <FormControl>
                                    <Input1
                                        placeholder={t(
                                            "login.field1.placeholder"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-[clamp(16px,_2vw,_20px)]">
                                        {t("login.field2.title")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input1
                                            type="password"
                                            placeholder={t(
                                                "login.field2.placeholder"
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
                            href="#"
                        >
                            {t("login.forgotPasswordLink")}
                        </Link>
                    </div>
                </div>
                <Button1
                    type="submit"
                    text={t("login.cta")}
                    className="py-6 w-full"
                />
            </form>
        </Form>
    );
};

export default LoginForm;
