"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import BaseInput from "@/components/inputs/BaseInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetAllLanguages, apiUpdateStaff } from "@/lib/api";
import {
    updateStaffSchema,
    UpdateStaffSchemaType,
} from "@/utils/schemas/staff/update-staff-schema";
import { FC, useState, useEffect } from "react";
import SharedForm from "@/components/forms/SharedForm";
import { staffTypes } from "@/constants/staffTypes";
import SelectWithSearch from "@/components/selects/SelectWithSearch";
import AvatarFileUpload from "@/components/inputs/AvatarFileUpload";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";
import { getServerUrl } from "@/lib/utils";

interface UpdateStaffFormProps {
    staff: StaffType;
}

const UpdateStaffForm: FC<UpdateStaffFormProps> = ({ staff }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const [languages, setLanguages] = useState<LanguageType[]>([]);

    const languagesQuery = useQuery({
        queryKey: ["get-all-languages"],
        queryFn: () => apiGetAllLanguages(token!),
    });

    useEffect(() => {
        if (
            languagesQuery.data &&
            JSON.stringify(languagesQuery.data) !== JSON.stringify(languages)
        ) {
            setLanguages(languagesQuery.data);
        }
    }, [languagesQuery.data, languages]);

    // Get the staff's image
    const staffImage = staff.imagePath.map((image) => ({
        id: image.id,
        name: image.name,
        size: image.size,
        url: `${getServerUrl()}/${image.path}`,
        type: image.type,
    }));

    const form = useForm<UpdateStaffSchemaType>({
        resolver: zodResolver(updateStaffSchema),
        defaultValues: {
            image_path: [],
            firstname: staff.firstname,
            lastname: staff.lastname,
            type: staff.type,
            dialCode: "+221",
            phoneNumber: staff.phoneNumber,
            email: staff.email,
            languages: staff.languages.map((language) =>
                language.id.toString()
            ),
            address: staff.address,
        },
    });

    const updateStaffMutation = useMutation({
        mutationFn: (variables: { data: UpdateStaffMutation }) =>
            apiUpdateStaff(token!, staff.id.toString(), variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-staff"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "manage-staff.staff-list.update-staff-dialog.success-messages.Staff updated successfully"
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
                        `manage-staff.staff-list.update-staff-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: UpdateStaffSchemaType) {
        updateStaffMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateStaffMutation}
            ctaText={t("manage-staff.staff-list.update-staff-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="image_path"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex justify-center">
                                    <AvatarFileUpload
                                        accept="image/png,image/jpeg,image/jpg"
                                        onFilesChange={field.onChange}
                                        initialFiles={staffImage}
                                    />
                                </div>
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
                                    "manage-staff.staff-list.update-staff-dialog.field2.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field2.placeholder"
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
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "manage-staff.staff-list.update-staff-dialog.field3.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field3.placeholder"
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
                                    "manage-staff.staff-list.update-staff-dialog.field4.title"
                                )}
                            </FormLabel>
                            <SelectWithSearch
                                value={field.value.toString()}
                                onValueChange={(value) => {
                                    field.onChange(Number(value));
                                }}
                                options={staffTypes}
                                placeholder={t(
                                    "manage-staff.staff-list.update-staff-dialog.field4.placeholder"
                                )}
                                noResultsText={t(
                                    "manage-staff.staff-list.update-staff-dialog.field4.no-results-text"
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
                                    "manage-staff.staff-list.update-staff-dialog.field5.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field5.placeholder"
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
                                    "manage-staff.staff-list.update-staff-dialog.field6.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field6.placeholder"
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
                                    "manage-staff.staff-list.update-staff-dialog.field7.title"
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
                                        "manage-staff.staff-list.update-staff-dialog.field7.title"
                                    )}
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field7.placeholder"
                                    )}
                                    emptyMessage={t(
                                        "manage-staff.staff-list.update-staff-dialog.field7.no-results-text"
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
                                    "manage-staff.staff-list.update-staff-dialog.field8.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "manage-staff.staff-list.update-staff-dialog.field8.placeholder"
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

export default UpdateStaffForm;
