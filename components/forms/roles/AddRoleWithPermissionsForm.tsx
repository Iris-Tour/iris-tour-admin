"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import Input1 from "@/components/inputs/Input1";
import Button2 from "@/components/buttons/Button2";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetAllPermissions, apiStoreRoleWithPermissions } from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
    role: z.string().min(2, {
        message: "Le nom du rôle doit contenir au moins 2 caractères.",
    }),
    permissions: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AddRoleWithPermissionsForm = () => {
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
            role: "",
            permissions: [],
        },
    });

    const storeRoleWithPermissionsMutation = useMutation({
        mutationFn: (variables: { data: StoreRoleWithPermissionsMutation }) =>
            apiStoreRoleWithPermissions(token!, variables.data),
        onSuccess: () => {
            // Update roles list
            queryClient.invalidateQueries({
                queryKey: ["get-all-roles-with-permissions"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "roles-and-permissions.addRoleDialog.success-messages.Permissions assigned successfully"
                )
            );
        },
        onError: (error: any) => {
            // console.log(error);
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `roles-and-permissions.addRoleDialog.error-messages.${error.error.code}`
                    )
                );
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        storeRoleWithPermissionsMutation.mutate({ data: values });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "roles-and-permissions.addRoleDialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "roles-and-permissions.addRoleDialog.field1.placeholder"
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
                                "roles-and-permissions.addRoleDialog.permissions.title"
                            )}
                        </h3>
                        <p>
                            {t(
                                "roles-and-permissions.addRoleDialog.permissions.description"
                            )}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {allPermissions &&
                        allPermissions.permissions.length > 0 ? (
                            allPermissions.permissions.map(
                                (permission, index) => (
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
                                )
                            )
                        ) : (
                            <p>Aucune permission trouvée.</p>
                        )}
                    </div>
                </div>
                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    type="submit"
                    disabled={storeRoleWithPermissionsMutation.isPending}
                >
                    {t("roles-and-permissions.addRoleDialog.cta")}
                </Button2>
            </form>
        </Form>
    );
};

export default AddRoleWithPermissionsForm;
