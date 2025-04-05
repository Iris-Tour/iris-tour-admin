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
import Button1 from "@/components/buttons/Button1";
import { useTranslation } from "react-i18next";
import InputOtp1 from "@/components/inputs/InputOtp1";

const formSchema = z.object({
    otp: z.string({ required_error: "Veuillez entrer le code otp" }),
});

const ResetPasswordOtpForm = () => {
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: undefined,
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
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputOtp1 />
                                </FormControl>
                                <FormMessage className="flex justify-center" />
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

export default ResetPasswordOtpForm;
