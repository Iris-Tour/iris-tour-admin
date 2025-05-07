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
import { apiUpdateLanguage } from "@/lib/api";
import {
    updateLanguageSchema,
    UpdateLanguageSchemaType,
} from "@/utils/schemas/languages/update-language-schema";
import SharedForm from "@/components/forms/SharedForm";

interface UpdateLanguageFormProps {
    language: LanguageType;
}

const UpdateLanguageForm: FC<UpdateLanguageFormProps> = ({ language }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<UpdateLanguageSchemaType>({
        resolver: zodResolver(updateLanguageSchema),
        defaultValues: {
            title: language.title,
        },
    });

    const updateLanguageMutation = useMutation({
        mutationFn: (variables: { data: UpdateLanguageMutation }) =>
            apiUpdateLanguage(token!, language.id, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-languages"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-languages.languages-list.update-language-dialog.success-messages.Language updated successfully"
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
                        `manage-languages.languages-list.update-language-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: UpdateLanguageSchemaType) {
        updateLanguageMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateLanguageMutation}
            ctaText={t(
                "manage-languages.languages-list.update-language-dialog.cta"
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
                                    "manage-languages.languages-list.update-language-dialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-languages.languages-list.update-language-dialog.field1.placeholder"
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

export default UpdateLanguageForm;
