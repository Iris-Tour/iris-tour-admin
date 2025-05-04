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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateStaff } from "@/lib/api";
import {
    updateStaffSchema,
    UpdateStaffSchemaType,
} from "@/utils/schemas/staff/update-staff-schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import SharedForm from "@/components/forms/SharedForm";

interface UpdateStaffFormProps {
    staff: StaffType;
}

const UpdateStaffForm: FC<UpdateStaffFormProps> = ({ staff }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<UpdateStaffSchemaType>({
        resolver: zodResolver(updateStaffSchema),
        defaultValues: {
            name: staff.name,
            type: staff.type,
            phone: staff.phone,
            email: staff.email,
            languages: staff.languages,
            address: staff.address,
        },
    });

    const updateStaffMutation = useMutation({
        mutationFn: (variables: { data: UpdateStaffMutation }) =>
            apiUpdateStaff(token!, staff.id, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-all-staff"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "staff-management.staff-list.edit-staff-dialog.success-messages.Staff updated successfully"
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
                        `staff-management.staff-list.edit-staff-dialog.error-messages.${code}.${field}.${rule}`
                    )
                );
            }
        },
    });

    function onSubmit(values: UpdateStaffSchemaType) {
        updateStaffMutation.mutate({ data: values });
    }

    const handleLanguageChange = (value: string) => {
        const currentLanguages = form.getValues("languages");
        if (!currentLanguages.includes(value)) {
            form.setValue("languages", [...currentLanguages, value]);
        }
    };

    const removeLanguage = (languageToRemove: string) => {
        const currentLanguages = form.getValues("languages");
        form.setValue(
            "languages",
            currentLanguages.filter((lang) => lang !== languageToRemove)
        );
    };

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateStaffMutation}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "staff-management.staff-list.edit-staff-dialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "staff-management.staff-list.edit-staff-dialog.field1.placeholder"
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
                                    "staff-management.staff-list.edit-staff-dialog.field2.title"
                                )}
                            </FormLabel>
                            <Select
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
                                defaultValue={field.value.toString()}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={t(
                                                "staff-management.staff-list.edit-staff-dialog.field2.placeholder"
                                            )}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Guide</SelectItem>
                                    <SelectItem value="2">Driver</SelectItem>
                                    <SelectItem value="3">Manager</SelectItem>
                                </SelectContent>
                            </Select>
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
                                    "staff-management.staff-list.edit-staff-dialog.field3.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "staff-management.staff-list.edit-staff-dialog.field3.placeholder"
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
                                    "staff-management.staff-list.edit-staff-dialog.field4.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "staff-management.staff-list.edit-staff-dialog.field4.placeholder"
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
                                    "staff-management.staff-list.edit-staff-dialog.field5.title"
                                )}
                            </FormLabel>
                            <div className="space-y-2">
                                <Select onValueChange={handleLanguageChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={t(
                                                    "staff-management.staff-list.edit-staff-dialog.field5.placeholder"
                                                )}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Fr">
                                            Français
                                        </SelectItem>
                                        <SelectItem value="En">
                                            English
                                        </SelectItem>
                                        <SelectItem value="Es">
                                            Español
                                        </SelectItem>
                                        <SelectItem value="De">
                                            Deutsch
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex flex-wrap gap-2">
                                    {field.value.map((language) => (
                                        <Badge
                                            key={language}
                                            variant="secondary"
                                        >
                                            {language}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeLanguage(language)
                                                }
                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
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
                                    "staff-management.staff-list.edit-staff-dialog.field6.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "staff-management.staff-list.edit-staff-dialog.field6.placeholder"
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
