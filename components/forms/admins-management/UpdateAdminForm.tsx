import SharedForm from "@/components/forms/SharedForm";
import BaseInput from "@/components/inputs/BaseInput";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { apiUpdateAdmin } from "@/lib/api";
import {
    updateAdminSchema,
    UpdateAdminSchemaType,
} from "@/utils/schemas/admins/update-admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";

interface UpdateAdminFormProps {
    admin: AdminType;
    adminRoles: Array<RoleType>;
    allRoles: Array<RoleType>;
}

const UpdateAdminForm: FC<UpdateAdminFormProps> = ({
    admin,
    adminRoles,
    allRoles,
}) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<UpdateAdminSchemaType>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            lastname: admin.lastname,
            firstname: admin.firstname,
            email: admin.email,
            roles:
                adminRoles.length > 0
                    ? adminRoles.map((role) => Number(role.id))
                    : [],
        },
    });

    const updateAdminMutation = useMutation({
        mutationFn: (variables: { data: UpdateAdminMutation }) =>
            apiUpdateAdmin(token!, admin.id.toString(), variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "roles-and-permissions.admins-list.update-admin-dialog.success-messages.Admin updated successfully"
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
                console.log(error);
                toast.error(
                    t(
                        `roles-and-permissions.admins-list.update-admin-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: UpdateAdminSchemaType) {
        updateAdminMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateAdminMutation}
            ctaText={t(
                "roles-and-permissions.admins-list.update-admin-dialog.cta"
            )}
        >
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "roles-and-permissions.admins-list.update-admin-dialog.field1.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field1.placeholder"
                                )}
                                disabled={true}
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field2.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field2.placeholder"
                                )}
                                disabled={true}
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field3.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field3.placeholder"
                                )}
                                disabled={true}
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field4.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <MultiselectWithPlaceholderAndClear
                                options={allRoles.map((role) => ({
                                    label: role.slug,
                                    value: role.id.toString(),
                                }))}
                                value={field.value?.map((value) => ({
                                    label:
                                        allRoles.find(
                                            (role) => Number(role.id) === value
                                        )?.slug || "",
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
                                    "roles-and-permissions.admins-list.update-admin-dialog.field4.placeholder"
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

export default UpdateAdminForm;
