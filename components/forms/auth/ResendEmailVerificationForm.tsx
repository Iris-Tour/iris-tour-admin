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
import { useMutation } from "@tanstack/react-query";
import { apiResendEmailVerification } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Veuillez entrer votre email" })
        .email({ message: "Adresse mail invalide" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const ResendEmailVerificationForm = () => {
    const { t } = useTranslation();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const resendEmailVerificationMutation = useMutation({
        mutationFn: (variables: ResendEmailVerificationMutation) =>
            apiResendEmailVerification(variables),
        onSuccess: () => {
            toast.success(
                t(
                    "verify-email.resend-email-verification.success-messages.Email sent successfully"
                )
            );
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `verify-email.resend-email-verification.error-messages.${error.error.code}`
                    )
                );
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        resendEmailVerificationMutation.mutate(values);
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
                                    {t(
                                        "verify-email.resend-email-verification.field1.title"
                                    )}
                                </FormLabel>
                                <FormControl>
                                    <Input1
                                        placeholder={t(
                                            "verify-email.resend-email-verification.field1.placeholder"
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
                        {t(
                            "verify-email.resend-email-verification.loginLink"
                        )}
                    </Link>
                </div>
                <Button1
                    type="submit"
                    className="py-6 w-full"
                    disabled={resendEmailVerificationMutation.isPending}
                >
                    {resendEmailVerificationMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        t("verify-email.resend-email-verification.cta")
                    )}
                </Button1>
            </form>
        </Form>
    );
};

export default ResendEmailVerificationForm;
