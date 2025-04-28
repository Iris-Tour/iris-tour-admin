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
import useAuth from "@/hooks/useAuth";
import Input1 from "@/components/inputs/Input1";
import { DialogClose } from "@/components/ui/dialog";
import Button2 from "@/components/buttons/Button2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStoreUser } from "@/lib/api";
import SpinningCircle from "@/components/spinners/SpinningCircle";
import {
    storeUserSchema,
    StoreUserSchemaType,
} from "@/utils/schemas/users/store-user-schema";
import { FC } from "react";

interface UpdateUserFormProps {
    user: UserType;
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ user }) => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const queryClient = useQueryClient();

    const form = useForm<StoreUserSchemaType>({
        resolver: zodResolver(storeUserSchema),
        defaultValues: {
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            password: "",
            passwordConfirmation: "",
        },
    });

    const storeUserMutation = useMutation({
        mutationFn: (variables: { data: StoreUserMutation }) =>
            apiStoreUser(token!, variables.data),
        onSuccess: () => {
            // Update users list
            queryClient.invalidateQueries({
                queryKey: ["get-all-users"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-users.users-list.add-user-dialog.success-messages.User updated successfully"
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
        // storeUserMutation.mutate({ data: values });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
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
                                    <Input1
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
                                    <Input1
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
                                    <Input1
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
                                    <Input1
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
                                    <Input1
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
                </div>

                <DialogClose id="dialog-close"></DialogClose>
                <Button2 type="submit" disabled={storeUserMutation.isPending}>
                    {storeUserMutation.isPending ? (
                        <SpinningCircle />
                    ) : (
                        t("manage-users.users-list.add-user-dialog.cta")
                    )}
                </Button2>
            </form>
        </Form>
    );
};

export default UpdateUserForm;
