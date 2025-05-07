"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { apiStoreUser } from "@/lib/api";
import {
    storeUserSchema,
    StoreUserSchemaType,
} from "@/utils/schemas/users/store-user-schema";
import SharedForm from "@/components/forms/SharedForm";

const AddUserForm = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<StoreUserSchemaType>({
        resolver: zodResolver(storeUserSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const storeUserMutation = useMutation({
        mutationFn: (variables: { data: StoreUserMutation }) =>
            apiStoreUser(token!, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-users"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-users.users-list.add-user-dialog.success-messages.User created successfully"
                )
            );
        },
        onError: (error: any) => {
            const code = error?.error?.code;
            const field = error?.error?.messages[0].field;
            const rule = error?.error?.messages[0].rule;

            toast.error(
                t(
                    `manage-users.users-list.add-user-dialog.error-messages.${code}.${field}.${rule}`
                )
            );
        },
    });

    function onSubmit(values: StoreUserSchemaType) {
        storeUserMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeUserMutation}
            ctaText={t("manage-users.users-list.add-user-dialog.cta")}
        >
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "manage-users.users-list.add-user-dialog.field1.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "manage-users.users-list.add-user-dialog.field1.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "manage-users.users-list.add-user-dialog.field2.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "manage-users.users-list.add-user-dialog.field2.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "manage-users.users-list.add-user-dialog.field3.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "manage-users.users-list.add-user-dialog.field3.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "manage-users.users-list.add-user-dialog.field4.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                type="password"
                                placeholder={t(
                                    "manage-users.users-list.add-user-dialog.field4.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "manage-users.users-list.add-user-dialog.field5.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                type="password"
                                placeholder={t(
                                    "manage-users.users-list.add-user-dialog.field5.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </SharedForm>
    );
};

export default AddUserForm;
