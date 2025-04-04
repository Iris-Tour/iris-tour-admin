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
import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Button1 from "@/components/buttons/Button1";

const formSchema = z.object({
    email: z
        .string({ required_error: "Veuillez entrer le mail" })
        .email({ message: "Adresse mail invalide" }),
    password: z.string({ required_error: "Veuillez entrer le mot de passe" }),
});

const LoginPage = () => {
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
        <div className="flex w-full h-full">
            <div className="flex flex-col w-full lg:w-1/2 gap-5 pt-[50px] lg:pt-[100px] px-[50px] lg:px-[100px]">
                <div className="font-bold text-[clamp(24px,_8vw,_57px)]">
                    <span className="text-primary-color">Lo</span>
                    <span className="text-secondary-color">go</span>
                </div>
                <div>
                    <h1 className="font-semibold text-[clamp(18px,_5vw,_38px)]">
                        {t("login.greeting")}
                    </h1>
                    <p>{t("login.description")}</p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
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
            </div>
            <div className="hidden lg:block bg-login-image w-1/2 h-full"></div>
        </div>
    );
};

export default LoginPage;
