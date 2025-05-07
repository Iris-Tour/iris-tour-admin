"use client";

import { FC, useEffect, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetAllLanguages, apiStoreStaff } from "@/lib/api";
import {
    storeStaffSchema,
    StoreStaffSchemaType,
} from "@/utils/schemas/staff/store-staff-schema";
import SharedForm from "@/components/forms/SharedForm";
import { staffTypes } from "@/constants/staffTypes";
import SelectWithSearch from "@/components/selects/SelectWithSearch";
import AvatarFileUpload from "@/components/inputs/AvatarFileUpload";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";
import PhoneNumberInput from "@/components/inputs/PhoneNumberInput";
import NumericInput from "@/components/inputs/NumericInput";
import FileUpload from "@/components/inputs/FileUpload";

const AddStaffForm: FC = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const [languages, setLanguages] = useState<LanguageType[]>([]);

    const languagesQuery = useQuery({
        queryKey: ["get-all-languages"],
        queryFn: () => apiGetAllLanguages(token!),
    });

    useEffect(() => {
        if (languagesQuery.data) {
            setLanguages(languagesQuery.data);
        }
    }, [languagesQuery.data]);

    const form = useForm<StoreStaffSchemaType>({
        resolver: zodResolver(storeStaffSchema),
        defaultValues: {
            image_path: [],
            firstname: "",
            lastname: "",
            type: undefined,
            dialCode: "+221",
            phoneNumber: "",
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
            console.log(error);
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
        storeStaffMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeStaffMutation}
            ctaText={t("manage-staff.staff-list.add-staff-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="image_path"
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
                                        accept="image/png,image/jpeg,image/jpg"
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
                    name="lastname"
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
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field3.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field3.placeholder"
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
                                    "manage-staff.staff-list.add-staff-dialog.field4.title"
                                )}
                            </FormLabel>
                            <SelectWithSearch
                                value={field.value?.toString() ?? ""}
                                onValueChange={(value) => {
                                    field.onChange(Number(value));
                                }}
                                options={staffTypes}
                                placeholder={t(
                                    "manage-staff.staff-list.add-staff-dialog.field4.placeholder"
                                )}
                                noResultsText={t(
                                    "manage-staff.staff-list.add-staff-dialog.field4.no-results-text"
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.add-staff-dialog.field5.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field5.placeholder"
                                    )}
                                    maxLength={9}
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
                                    "manage-staff.staff-list.add-staff-dialog.field6.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field6.placeholder"
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
                                    "manage-staff.staff-list.add-staff-dialog.field7.title"
                                )}
                            </FormLabel>
                            <div className="space-y-2">
                                <MultiselectWithPlaceholderAndClear
                                    onChange={(selectedOptions) => {
                                        const languages = selectedOptions.map(
                                            (option) => option.value.toString()
                                        );
                                        field.onChange(languages);
                                    }}
                                    options={
                                        languages?.map((language) => ({
                                            label: language.title,
                                            value: language.id.toString(),
                                        })) ?? []
                                    }
                                    value={field.value?.map((value) => ({
                                        label:
                                            languages?.find(
                                                (lang) =>
                                                    lang.id.toString() === value
                                            )?.title || "",
                                        value: value.toString(),
                                    }))}
                                    label={t(
                                        "manage-staff.staff-list.add-staff-dialog.field7.title"
                                    )}
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field7.placeholder"
                                    )}
                                    emptyMessage={t(
                                        "manage-staff.staff-list.add-staff-dialog.field7.no-results-text"
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
                                    "manage-staff.staff-list.add-staff-dialog.field8.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.add-staff-dialog.field8.placeholder"
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
