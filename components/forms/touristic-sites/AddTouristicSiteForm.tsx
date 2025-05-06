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
import useAuth from "@/hooks/useAuth";
import BaseInput from "@/components/inputs/BaseInput";
import Textarea1 from "@/components/inputs/Textarea1";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiStoreTouristicSite, apiGetAllStaff } from "@/lib/api";
import { storeTouristicSiteSchema } from "@/utils/schemas/touristic-sites/store-touristic-site-schema";
import FileUpload from "@/components/inputs/FileUpload";
import SharedForm from "@/components/forms/SharedForm";
import ProfileSelect from "@/components/selects/ProfileSelect";
import NumericInput from "@/components/inputs/NumericInput";
import Select1 from "@/components/selects/Select1";
import ScheduleTimePicker from "@/components/inputs/ScheduleTimePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

const formSchema = storeTouristicSiteSchema;

type FormSchemaType = z.infer<typeof formSchema>;

const AddTouristSiteForm = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: staffs = [] } = useQuery({
        queryKey: ["get-all-staffs"],
        queryFn: () => apiGetAllStaff(token!),
    });

    // Filtrer pour n'avoir que les guides touristiques (type 1)
    const siteGuides = staffs.filter((staff) => staff.type === 1);

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            category: "",
            schedule: {
                lundi: "",
                mardi: "",
                mercredi: "",
                jeudi: "",
                vendredi: "",
                samedi: "",
                dimanche: "",
            },
            entranceFee: "",
            accessibilityForDisabled: false,
            averageRating: 0,
            mainImages: [],
            legalStatus: "",
            staffId: 0,
        },
    });

    const storeTouristSiteMutation = useMutation({
        mutationFn: (variables: { data: StoreTouristicSiteMutation }) =>
            apiStoreTouristicSite(token!, variables.data),
        onSuccess: () => {
            // Update tourist sites list
            queryClient.invalidateQueries({
                queryKey: ["get-all-touristic-sites"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success("Site touristique créé avec succès.");
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
        storeTouristSiteMutation.mutate({
            data: values,
        });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeTouristSiteMutation}
            ctaText={t("touristic-sites.add-touristic-site-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Nom du site
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez le nom du site"
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
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder="Entrez la description du site"
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
                            <FormLabel className="text-base">Adresse</FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez l'adresse du site"
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
                                Catégorie
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
                                    placeholder="Sélectionnez une catégorie"
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
                            <ScheduleTimePicker
                                day="Lundi"
                                control={form.control}
                                name="schedule.lundi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.mardi"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Mardi"
                                control={form.control}
                                name="schedule.mardi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.mercredi"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Mercredi"
                                control={form.control}
                                name="schedule.mercredi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.jeudi"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Jeudi"
                                control={form.control}
                                name="schedule.jeudi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.vendredi"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Vendredi"
                                control={form.control}
                                name="schedule.vendredi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.samedi"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Samedi"
                                control={form.control}
                                name="schedule.samedi"
                                field={field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="schedule.dimanche"
                        render={({ field }) => (
                            <ScheduleTimePicker
                                day="Dimanche"
                                control={form.control}
                                name="schedule.dimanche"
                                field={field}
                            />
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="entranceFee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Prix d'entrée
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    ref={field.ref}
                                    thousandSeparator=" "
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
                                    fixedDecimalScale
                                    inputSuffix="FCFA"
                                    placeholder="Entrez le prix d'entrée"
                                    value={field.value ?? ""}
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
                    name="legalStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Statut légal
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez le statut légal du site"
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
                                Guide assigné
                            </FormLabel>
                            <FormControl>
                                <ProfileSelect
                                    staffs={siteGuides}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Sélectionnez un guide"
                                    label="Guide assigné"
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
                                Accessibilité pour les personnes handicapées
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
                                Images du site
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    accept="image/png,image/jpeg,image/jpg"
                                    onFilesChange={field.onChange}
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

export default AddTouristSiteForm;
