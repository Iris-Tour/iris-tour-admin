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
import Link from "next/link";
import Button1 from "@/components/buttons/Button1";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "@/lib/api";
import { toast } from "sonner";
import Input1 from "@/components/inputs/Input1";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Veuillez entrer le mail" })
        .email({ message: "Adresse mail invalide" }),
    password: z.string().min(1, { message: "Veuillez entrer le mot de passe" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const LoginForm = () => {
    const { t } = useTranslation();

    const { login } = useAuth();
    const router = useRouter();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useMutation({
        mutationFn: (data: LoginMutation) => apiLogin(data),
        onSuccess: ({ user, token }) => {
            login(user, token);

            if (!user.isAdmin) {
                return toast.error(t("general-errors.not admin"));
            }
            
            toast.success(t("login.success-messages.login-successful"));
        },
        onError: (error: LoginError | string) => {
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(t(`login.error-messages.${error.error.code}`));
                if (error.error.code === "UNVERIFIED_EMAIL") {
                    router.push("/verify-email/resend-email-verification");
                }
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        loginMutation.mutate(values);
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
                    <div className="flex flex-col gap-3">
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
                            className="self-end underline text-secondary-2"
                            href="/reset-password"
                        >
                            {t("login.forgotPasswordLink")}
                        </Link>
                    </div>
                </div>
                <Button1
                    type="submit"
                    className="py-6 w-full"
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        t("login.cta")
                    )}
                </Button1>
            </form>
        </Form>
    );
};

export default LoginForm;
