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
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z
    .object({
        password: z
            .string({
                required_error: "Veuillez entrer le mot de passe",
            })
            .min(1, { message: "Veuillez entrer le mot de passe" })
            .min(8, {
                message: "Le mot de passe doit contenir au moins 8 caractères.",
            }),
        passwordConfirmation: z
            .string({
                required_error: "Veuillez entrer le mot de passe",
            })
            .min(1, { message: "Veuillez entrer le mot de passe" }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirmation"],
    });

type FormSchemaType = z.infer<typeof formSchema>;

const ChangePasswordForm = () => {
    const { t } = useTranslation();

    const params = useParams();
    const router = useRouter();

    const [resetToken, setResetToken] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        if (!params.token) {
            // Redirect to reset password page if no token
            router.push("/reset-password");
            return;
        }

        // Validate token format (basic check)
        const token = params.token as string;
        if (typeof token !== "string" || token.length < 10) {
            toast.error(t("general-errors.networkError"));
            router.push("/reset-password");
            return;
        }

        setResetToken(token);
        setIsTokenValid(true);
    }, [params.token, router, t]);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordConfirmation: "",
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (variables: ChangePasswordMutation) => {
            if (!isTokenValid) {
                throw new Error("Invalid token");
            }
            return changePassword(resetToken, variables);
        },
        onSuccess: () => {
            toast.success(
                t(
                    "reset-password.change-password-form.success-messages.Password reset successfully"
                )
            );

            // Redirect to login after success
            router.push("/login");
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `reset-password.change-password-form.error-messages.${error.message}`
                    )
                );

                // redirect to reset password page
                router.push("/reset-password");
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        changePasswordMutation.mutate(values);
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
                                    {t(
                                        "reset-password.change-password-form.field1.title"
                                    )}
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
                    <div className="flex flex-col gap-3">
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-[clamp(16px,_2vw,_20px)]">
                                        {t(
                                            "reset-password.change-password-form.field2.title"
                                        )}
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
                            className="self-end underline text-secondary-2"
                            href="/login"
                        >
                            {t("reset-password.change-password-form.loginLink")}
                        </Link>
                    </div>
                </div>
                <Button1
                    type="submit"
                    className="py-6 w-full"
                    disabled={changePasswordMutation.isPending}
                >
                    {changePasswordMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        t("reset-password.change-password-form.cta")
                    )}
                </Button1>
            </form>
        </Form>
    );
};

export default ChangePasswordForm;
