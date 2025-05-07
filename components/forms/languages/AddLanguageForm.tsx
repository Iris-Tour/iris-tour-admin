"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import BaseInput from "@/components/inputs/BaseInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStoreLanguage } from "@/lib/api";
import {
    storeLanguageSchema,
    StoreLanguageSchemaType,
} from "@/utils/schemas/languages/store-language-schema";
import SharedForm from "@/components/forms/SharedForm";

const AddLanguageForm: FC = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<StoreLanguageSchemaType>({
        resolver: zodResolver(storeLanguageSchema),
        defaultValues: {
            title: "",
        },
    });

    const storeLanguageMutation = useMutation({
        mutationFn: (variables: { data: StoreLanguageSchemaType }) =>
            apiStoreLanguage(token!, variables.data),
        onSuccess: () => {
            // Update languages list
            queryClient.invalidateQueries({
                queryKey: ["get-all-languages"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-languages.languages-list.add-language-dialog.success-messages.Language created successfully"
                )
            );
        },
        onError: (error: any) => {
            const code = error?.error?.code;
            const field = error?.error?.messages[0].field;
            const rule = error?.error?.messages[0].rule;

            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `manage-languages.languages-list.add-language-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: StoreLanguageSchemaType) {
        storeLanguageMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeLanguageMutation}
            ctaText={t(
                "manage-languages.languages-list.add-language-dialog.cta"
            )}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-languages.languages-list.add-language-dialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-languages.languages-list.add-language-dialog.field1.placeholder"
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </SharedForm>
    );
};

export default AddLanguageForm;
