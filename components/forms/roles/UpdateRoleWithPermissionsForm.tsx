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
import BaseInput from "@/components/inputs/BaseInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetAllPermissions, apiUpdateRoleWithPermissions } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { FC } from "react";
import SharedForm from "@/components/forms/SharedForm";

interface UpdateRoleWithPermissionsFormProps {
    role: string | undefined;
    roleId: string;
    rolePermissionsIds: string[] | undefined;
}

const formSchema = z.object({
    role: z.string().min(2, {
        message: "Le nom du rôle doit contenir au moins 2 caractères.",
    }),
    permissions: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

const UpdateRoleWithPermissionsForm: FC<UpdateRoleWithPermissionsFormProps> = ({
    role,
    roleId,
    rolePermissionsIds,
}) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: allPermissions } = useQuery({
        queryKey: ["get-all-permissions"],
        queryFn: () => apiGetAllPermissions(token!),
    });

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: role,
            permissions: rolePermissionsIds,
        },
    });

    const updateRoleWithPermissionsMutation = useMutation({
        mutationFn: (variables: { data: UpdateRoleWithPermissionsMutation }) =>
            apiUpdateRoleWithPermissions(token!, roleId, variables.data),
        onSuccess: () => {
            document.getElementById("dialog-close")?.click();

            queryClient.invalidateQueries({
                queryKey: ["get-all-roles-with-permissions"],
            });

            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            queryClient.invalidateQueries({
                queryKey: ["get-all-roles"],
            });
            toast.success(
                t(
                    "roles-and-permissions.updateRoleDialog.success-messages.Permissions assigned successfully"
                )
            );
        },
        onError: (error: any) => {
            console.log(error);
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `roles-and-permissions.updateRoleDialog.error-messages.${error.error.code}`
                    )
                );
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        updateRoleWithPermissionsMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateRoleWithPermissionsMutation}
            ctaText={t("roles-and-permissions.updateRoleDialog.cta")}
        >
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "roles-and-permissions.updateRoleDialog.field1.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <BaseInput
                                placeholder={t(
                                    "roles-and-permissions.updateRoleDialog.field1.placeholder"
                                )}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="flex flex-col gap-5">
                <div>
                    <h3 className="font-semibold text-lg">
                        {t(
                            "roles-and-permissions.updateRoleDialog.permissions.title"
                        )}
                    </h3>
                    <p>
                        {t(
                            "roles-and-permissions.updateRoleDialog.permissions.description"
                        )}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {allPermissions && allPermissions.permissions.length > 0 ? (
                        allPermissions.permissions.map((permission, index) => (
                            <div key={index}>
                                <FormField
                                    control={form.control}
                                    name="permissions"
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex items-center space-x-1">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(
                                                            permission.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            return checked
                                                                ? field.onChange(
                                                                      [
                                                                          ...(field.value ||
                                                                              []),
                                                                          permission.id,
                                                                      ]
                                                                  )
                                                                : field.onChange(
                                                                      field.value?.filter(
                                                                          (
                                                                              value
                                                                          ) =>
                                                                              value !==
                                                                              permission.id
                                                                      )
                                                                  );
                                                        }}
                                                        className="data-[state=checked]:border-primary data-[state=checked]:bg-primary w-6 h-6 cursor-pointer"
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-base cursor-pointer">
                                                    {permission.slug}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Aucune permission trouvée.</p>
                    )}
                </div>
            </div>
        </SharedForm>
    );
};

export default UpdateRoleWithPermissionsForm;
