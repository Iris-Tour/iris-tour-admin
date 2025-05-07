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
import useAuth from "@/hooks/useAuth";
import BaseInput from "@/components/inputs/BaseInput";
import Textarea1 from "@/components/inputs/Textarea1";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiUpdateTouristicSite, apiGetAllStaff } from "@/lib/api";
import { updateTouristicSiteSchema } from "@/utils/schemas/touristic-sites/update-touristic-site-schema";
import FileUpload from "@/components/inputs/FileUpload";
import SharedForm from "@/components/forms/SharedForm";
import ProfileSelect from "@/components/selects/ProfileSelect";
import NumericInput from "@/components/inputs/NumericInput";
import Select1 from "@/components/selects/Select1";
import { FC } from "react";
import { getServerUrl } from "@/lib/utils";
import ScheduleTimePicker from "@/components/inputs/ScheduleTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

const formSchema = updateTouristicSiteSchema;

type FormSchemaType = z.infer<typeof formSchema>;

interface UpdateTouristicSiteFormProps {
    site: TouristicSiteType;
}

const UpdateTouristicSiteForm: FC<UpdateTouristicSiteFormProps> = ({
    site,
}) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: staffs = [] } = useQuery({
        queryKey: ["get-all-staffs"],
        queryFn: () => apiGetAllStaff(token!),
    });

    // Filtrer pour n'avoir que les guides touristiques (type 1)
    const siteGuides = staffs.filter((staff) => staff.type === 1);

    // Get all the main images
    const initialImages = site.mainImages.map((image) => ({
        id: image.id.toString(),
        name: image.name,
        size: image.size,
        url: `${getServerUrl()}/${image.path}`,
        type: image.type,
    }));

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: site.name,
            description: site.description,
            address: site.address,
            category: site.category,
            schedule: site.schedule,
            entranceFee: site.entranceFee,
            accessibilityForDisabled: site.accessibilityForDisabled,
            averageRating: site.averageRating,
            mainImages: [],
            legalStatus: site.legalStatus,
            staffId: site.staffId,
        },
    });

    const updateTouristSiteMutation = useMutation({
        mutationFn: (variables: { data: UpdateTouristicSiteMutation }) =>
            apiUpdateTouristicSite(token!, site.id.toString(), variables.data),
        onSuccess: () => {
            // Update tourist sites list
            queryClient.invalidateQueries({
                queryKey: ["get-all-touristic-sites"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success("Site touristique mis à jour avec succès.");
        },
        onError: (error: any) => {
            console.log(error);
            if (typeof error === "string") {
                toast.error(error);
            } else {
                toast.error("Une erreur est survenue");
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        updateTouristSiteMutation.mutate({
            data: values,
        });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateTouristSiteMutation}
            ctaText={t("touristic-sites.update-touristic-site-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field1.placeholder"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field2.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field2.placeholder"
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
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field3.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field3.placeholder"
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
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field4.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Select1
                                    options={[
                                        { label: "Musée", value: "Musée" },
                                        { label: "Parc", value: "Parc" },
                                        {
                                            label: "Monument",
                                            value: "Monument",
                                        },
                                        {
                                            label: "Site historique",
                                            value: "Site historique",
                                        },
                                        {
                                            label: "Site naturel",
                                            value: "Site naturel",
                                        },
                                        { label: "Autre", value: "Autre" },
                                    ]}
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field4.placeholder"
                                    )}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="schedule.lundi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Lundi"
                                    control={form.control}
                                    name="schedule.lundi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.mardi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Mardi"
                                    control={form.control}
                                    name="schedule.mardi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.mercredi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Mercredi"
                                    control={form.control}
                                    name="schedule.mercredi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.jeudi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Jeudi"
                                    control={form.control}
                                    name="schedule.jeudi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.vendredi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Vendredi"
                                    control={form.control}
                                    name="schedule.vendredi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.samedi"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Samedi"
                                    control={form.control}
                                    name="schedule.samedi"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.dimanche"
                        render={({ field }) => (
                            <FormItem>
                                <ScheduleTimePicker
                                    day="Dimanche"
                                    control={form.control}
                                    name="schedule.dimanche"
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="entranceFee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field6.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    thousandSeparator=" "
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
                                    fixedDecimalScale
                                    inputSuffix="FCFA"
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field6.placeholder"
                                    )}
                                    value={field.value}
                                    onValueChange={({ floatValue }) => {
                                        field.onChange(
                                            floatValue?.toString() ?? ""
                                        );
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="averageRating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field7.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    thousandSeparator=""
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    decimalScale={1}
                                    fixedDecimalScale
                                    inputSuffix=""
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field7.placeholder"
                                    )}
                                    value={field.value}
                                    onValueChange={({ floatValue }) => {
                                        field.onChange(floatValue ?? 0);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="legalStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field8.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field8.placeholder"
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
                    name="staffId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field9.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <ProfileSelect
                                    staffs={siteGuides}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder={t(
                                        "touristic-sites.update-touristic-site-dialog.field9.placeholder"
                                    )}
                                    label={t(
                                        "touristic-sites.update-touristic-site-dialog.field9.title"
                                    )}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accessibilityForDisabled"
                    render={({ field }) => (
                        <FormItem className="flex items-center bg-white gap-3 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="text-sm md:text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field10.title"
                                )}
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mainImages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "touristic-sites.update-touristic-site-dialog.field11.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    accept="image/png,image/jpeg,image/jpg"
                                    onFilesChange={field.onChange}
                                    initialFiles={initialImages}
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

export default UpdateTouristicSiteForm;
