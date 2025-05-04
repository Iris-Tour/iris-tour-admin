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
import { apiStoreStaff } from "@/lib/api";
import {
    storeStaffSchema,
    StoreStaffSchemaType,
} from "@/utils/schemas/staff/store-staff-schema";
import SharedForm from "@/components/forms/SharedForm";
import { staffTypes } from "@/constants/staffTypes";
import SelectWithSearch from "@/components/selects/SelectWithSearch";
import AvatarFileUpload from "@/components/inputs/AvatarFileUpload";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";

const AddStaffForm: FC = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const languages = [
        { label: "Français", value: "Français" },
        { label: "English", value: "English" },
        { label: "Español", value: "Español" },
    ];

    const form = useForm<StoreStaffSchemaType>({
        resolver: zodResolver(storeStaffSchema),
        defaultValues: {
            imagePath: undefined,
            name: "",
            type: undefined,
            phone: "",
            email: "",
            languages: [],
            address: "",
        },
    });

    const storeStaffMutation = useMutation({
        mutationFn: (variables: { data: StoreStaffSchemaType }) =>
            apiStoreStaff(token!, variables.data),
        onSuccess: () => {
            // Update staff list
            queryClient.invalidateQueries({
                queryKey: ["get-all-staff"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-staff.staff-list.add-staff-dialog.success-messages.Staff created successfully"
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
                        `manage-staff.staff-list.add-staff-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: StoreStaffSchemaType) {
        console.log(values);
        // storeStaffMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeStaffMutation}
            ctaText={t("manage-staff.staff-list.add-staff-dialog.cta")}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="imagePath"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field1.title"
                                )}
                            </FormLabel> */}
                            <FormControl>
                                <div className="flex justify-center">
                                    <AvatarFileUpload
                                        onFilesChange={field.onChange}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field2.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field2.placeholder"
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
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field3.title"
                                )}
                            </FormLabel>
                            <SelectWithSearch
                                onValueChange={(value) => {
                                    field.onChange(Number(value));
                                }}
                                options={staffTypes}
                                placeholder={t(
                                    "manage-staff.staff-list.add-staff-dialog.field3.placeholder"
                                )}
                                noResultsText={t(
                                    "manage-staff.staff-list.add-staff-dialog.field3.no-results-text"
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field4.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field4.placeholder"
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
                                    "manage-staff.staff-list.add-staff-dialog.field5.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field5.placeholder"
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
                    name="languages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field6.title"
                                )}
                            </FormLabel>
                            <div className="space-y-2">
                                <MultiselectWithPlaceholderAndClear
                                    onChange={(selectedOptions) => {
                                        field.onChange(selectedOptions);
                                    }}
                                    options={languages}
                                    label={t(
                                        "manage-staff.staff-list.add-staff-dialog.field6.title"
                                    )}
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field6.placeholder"
                                    )}
                                    emptyMessage={t(
                                        "manage-staff.staff-list.add-staff-dialog.field6.no-results-text"
                                    )}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field7.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field7.placeholder"
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

export default AddStaffForm;
