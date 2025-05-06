"use client";

import Button3 from "@/components/buttons/Button3";
import SimpleChip from "@/components/chips/SimpleChip";
import SharedForm from "@/components/forms/SharedForm";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import FileUpload from "@/components/inputs/FileUpload";
import BaseInput from "@/components/inputs/BaseInput";
import NumericInput from "@/components/inputs/NumericInput";
import Textarea1 from "@/components/inputs/Textarea1";
import Select1 from "@/components/selects/Select1";
import ProfileSelect from "@/components/selects/ProfileSelect";
import MultiselectWithPlaceholderAndClear from "@/components/selects/MultiselectWithPlaceholderAndClear";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/hooks/useAuth";
import { apiStoreEvent, apiGetAllStaff } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
    storeEventSchema,
    StoreEventSchemaType,
} from "@/utils/schemas/events/store-event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const AddEventForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const queryClient = useQueryClient();

    const { data: staffs = [] } = useQuery({
        queryKey: ["get-all-staffs"],
        queryFn: () => apiGetAllStaff(token!),
    });

    // Filtrer pour n'avoir que les organisateurs (type 2)
    const eventOrganizers = staffs.filter((staff) => staff.type === 2);

    const languages = [
        { label: "Français", value: "Français" },
        { label: "English", value: "English" },
        { label: "Español", value: "Español" },
    ];

    const form = useForm({
        resolver: zodResolver(storeEventSchema),
        defaultValues: {
            name: "",
            description: "",
            startDateTime: format(new Date(), "yyyy-MM-dd"),
            endDateTime: format(new Date(), "yyyy-MM-dd"),
            location: "",
            category: "",
            staffId: 0,
            ticketPrice: undefined,
            maximumCapacity: undefined,
            targetAudience: "",
            eventLanguages: [],
            accessibilityForDisabled: false,
            program: "",
            promotionalImage: [],
            eventStatus: 0,
        },
    });

    const storeEventMutation = useMutation({
        mutationFn: (variables: { data: StoreEventMutation }) =>
            apiStoreEvent(token!, variables.data),
        onSuccess: () => {
            // Update events list
            queryClient.invalidateQueries({
                queryKey: ["get-all-events"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                t(
                    "events.add-event-dialog.success-messages.Event created successfully"
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
                        `events.add-event-dialog.error-messages.${error.error.code}`,
                        "Une erreur est survenue."
                    )
                );
            }
        },
    });

    function onSubmit(values: StoreEventSchemaType) {
        console.log(values);
        storeEventMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeEventMutation}
            ctaText={t("events.add-event-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field1.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.add-event-dialog.field1.placeholder"
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
                                {t("events.add-event-dialog.field2.title")}
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder={t(
                                        "events.add-event-dialog.field2.placeholder"
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
                    name="startDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field3.title")}
                            </FormLabel>
                            <FormControl>
                                <DateTimePicker
                                    ref={field.ref}
                                    date={field.value.toString()}
                                    onSelect={(
                                        selectedDate: Date | undefined
                                    ) =>
                                        field.onChange(
                                            selectedDate
                                                ? selectedDate.toISOString()
                                                : ""
                                        )
                                    }
                                    placeholder={t(
                                        "events.add-event-dialog.field3.placeholder"
                                    )}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field4.title")}
                            </FormLabel>
                            <FormControl>
                                <DateTimePicker
                                    ref={field.ref}
                                    date={field.value.toString()}
                                    onSelect={(
                                        selectedDate: Date | undefined
                                    ) =>
                                        field.onChange(
                                            selectedDate
                                                ? selectedDate.toISOString()
                                                : ""
                                        )
                                    }
                                    placeholder={t(
                                        "events.add-event-dialog.field4.placeholder"
                                    )}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field5.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.add-event-dialog.field5.placeholder"
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
                                {t("events.add-event-dialog.field6.title")}
                            </FormLabel>
                            <FormControl>
                                <Select1
                                    options={[
                                        { label: "Catégorie 1", value: "0" },
                                        { label: "Catégorie 2", value: "1" },
                                        { label: "Catégorie 3", value: "2" },
                                    ]}
                                    placeholder={t(
                                        "events.add-event-dialog.field6.placeholder"
                                    )}
                                    value={field.value}
                                    onValueChange={field.onChange}
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
                                Organisateur
                            </FormLabel>
                            <FormControl>
                                <ProfileSelect
                                    staffs={eventOrganizers}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Sélectionnez un organisateur"
                                    label="Organisateur"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field8.title")}
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
                                    placeholder={t(
                                        "events.add-event-dialog.field8.placeholder"
                                    )}
                                    value={field.value ?? ""}
                                    onValueChange={({ floatValue }) => {
                                        field.onChange(floatValue ?? undefined); // send clean number
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maximumCapacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field9.title")}
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    ref={field.ref}
                                    thousandSeparator=""
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
                                    fixedDecimalScale
                                    inputSuffix=""
                                    placeholder={t(
                                        "events.add-event-dialog.field9.placeholder"
                                    )}
                                    value={field.value ?? ""}
                                    onValueChange={({ floatValue }) => {
                                        field.onChange(floatValue ?? undefined); // send clean number
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field10.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.add-event-dialog.field10.placeholder"
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
                    name="eventLanguages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field11.title")}
                            </FormLabel>
                            <div className="space-y-2">
                                <MultiselectWithPlaceholderAndClear
                                    onChange={(selectedOptions) => {
                                        const languages = selectedOptions.map(
                                            (option) => option.value
                                        );
                                        field.onChange(languages);
                                    }}
                                    options={languages}
                                    label={t(
                                        "events.add-event-dialog.field11.title"
                                    )}
                                    placeholder={t(
                                        "events.add-event-dialog.field11.placeholder"
                                    )}
                                    emptyMessage={t(
                                        "events.add-event-dialog.field11.not-found"
                                    )}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field14.title")}
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder={t(
                                        "events.add-event-dialog.field14.placeholder"
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
                    name="promotionalImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field15.title")}
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

export default AddEventForm;
