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
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStoreAdmin } from "@/lib/api";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";
import SharedForm from "@/components/forms/SharedForm";

interface AddAdminFormProps {
    roles?: Array<RolesWithPermissions>;
}

const formSchema = z.object({
    lastname: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z
        .string()
        .min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Ce champ est requis." }),
    roles: z
        .array(z.number().int().positive("ID de rôle invalide"))
        .refine((roles) => roles.length > 0, {
            message: "Veuillez sélectionner au moins un rôle.",
        }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AddAdminForm: FC<AddAdminFormProps> = ({ roles }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            roles: [],
        },
    });

    const storeAdminMutation = useMutation({
        mutationFn: (variables: { data: StoreAdminMutation }) =>
            apiStoreAdmin(token!, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "roles-and-permissions.admins-list.add-admin-dialog.success-messages.Admin created successfully"
                )
            );
        },
        onError: (error: any) => {
            const code = error?.error?.code;
            const field = error?.error?.messages[0].field;
            const rule = error?.error?.messages[0].rule;

            toast.error(
                t(
                    `roles-and-permissions.admins-list.add-admin-dialog.error-messages.${code}.${field}.${rule}`
                )
            );
        },
    });

    function onSubmit(values: FormSchemaType) {
        storeAdminMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeAdminMutation}
            ctaText={t(
                "roles-and-permissions.admins-list.add-admin-dialog.cta"
            )}
        >
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "roles-and-permissions.admins-list.add-admin-dialog.field1.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field1.placeholder"
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
                                "roles-and-permissions.admins-list.add-admin-dialog.field2.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field2.placeholder"
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
                                "roles-and-permissions.admins-list.add-admin-dialog.field3.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field3.placeholder"
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
                name="roles"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "roles-and-permissions.admins-list.add-admin-dialog.field4.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <MultiselectWithPlaceholderAndClear
                                options={
                                    roles?.map((role) => ({
                                        label: role.role.slug,
                                        value: role.role.id.toString(),
                                    })) || []
                                }
                                value={field.value?.map((value) => ({
                                    label:
                                        roles?.find(
                                            (role) =>
                                                Number(role.role.id) === value
                                        )?.role.slug || "",
                                    value: value.toString(),
                                }))}
                                onChange={(selectedOptions) => {
                                    form.setValue(
                                        "roles",
                                        selectedOptions.map((option) =>
                                            Number(option.value)
                                        )
                                    );
                                }}
                                placeholder={t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field4.placeholder"
                                )}
                                emptyMessage="Aucun rôle trouvé."
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </SharedForm>
    );
};

export default AddAdminForm;
