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
import { apiUpdateEvent, apiGetAllStaff } from "@/lib/api";
import { cn, getServerUrl } from "@/lib/utils";
import {
    updateEventSchema,
    UpdateEventSchemaType,
} from "@/utils/schemas/events/update-event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface UpdateEventFormProps {
    event: EventType;
}

const UpdateEventForm: FC<UpdateEventFormProps> = ({ event }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: staffs = [] } = useQuery({
        queryKey: ["get-all-staffs"],
        queryFn: () => apiGetAllStaff(token!),
    });

    const languages = [
        { label: "Français", value: "Français" },
        { label: "English", value: "English" },
        { label: "Español", value: "Español" },
    ];

    // Get all the promotional images
    const initialImages = event.promotionalImage.map((image) => ({
        id: image.id,
        name: image.name,
        size: image.size,
        url: `${getServerUrl()}/${image.path}`,
        type: image.type,
    }));

    const form = useForm({
        resolver: zodResolver(updateEventSchema),
        defaultValues: {
            name: event.name,
            description: event.description ?? "",
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            location: event.location,
            category: event.category,
            staffId: event.staffId,
            ticketPrice: Number(event.ticketPrice),
            maximumCapacity: Number(event.maximumCapacity),
            targetAudience: event.targetAudience ?? "",
            eventLanguages: event.eventLanguages.map((lang) => lang.language),
            accessibilityForDisabled: event.accessibilityForDisabled,
            program: event.program ?? "",
            promotionalImage: [],
            eventStatus: 0,
        },
    });

    const updateEventMutation = useMutation({
        mutationFn: (variables: { data: UpdateEventMutation }) =>
            apiUpdateEvent(token!, event.id.toString(), variables.data),
        onSuccess: () => {
            // Update events list
            queryClient.invalidateQueries({
                queryKey: ["get-all-events"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                <Trans
                    i18nKey={
                        "events.update-event-dialog.success-messages.Event updated successfully"
                    }
                    values={{ event: event.name }}
                    components={{ b: <b className="text-primary" /> }}
                />
            );
        },
        onError: (error: any) => {
            console.log(error);
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    t(
                        `events.update-event-dialog.error-messages.${error.error.code}`,
                        "Une erreur est survenue."
                    )
                );
            }
        },
    });

    function onSubmit(values: UpdateEventSchemaType) {
        console.log(values);
        updateEventMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateEventMutation}
            ctaText={t("events.update-event-dialog.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.update-event-dialog.field1.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.update-event-dialog.field1.placeholder"
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
                                {t("events.update-event-dialog.field2.title")}
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder={t(
                                        "events.update-event-dialog.field2.placeholder"
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
                                {t("events.update-event-dialog.field3.title")}
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
                                        "events.update-event-dialog.field3.placeholder"
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
                                {t("events.update-event-dialog.field4.title")}
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
                                        "events.update-event-dialog.field4.placeholder"
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
                                {t("events.update-event-dialog.field5.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.update-event-dialog.field5.placeholder"
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
                                {t("events.update-event-dialog.field6.title")}
                            </FormLabel>
                            <FormControl>
                                <Select1
                                    options={[
                                        { label: "Catégorie 1", value: "0" },
                                        { label: "Catégorie 2", value: "1" },
                                        { label: "Catégorie 3", value: "2" },
                                    ]}
                                    placeholder={t(
                                        "events.update-event-dialog.field6.placeholder"
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
                                    staffs={staffs}
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
                                {t("events.update-event-dialog.field8.title")}
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
                                        "events.update-event-dialog.field8.placeholder"
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
                                {t("events.update-event-dialog.field9.title")}
                            </FormLabel>
                            <FormControl>
                                <NumericInput
                                    thousandSeparator=""
                                    decimalSeparator=","
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    decimalScale={0}
                                    fixedDecimalScale
                                    inputSuffix=""
                                    placeholder={t(
                                        "events.update-event-dialog.field9.placeholder"
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
                                {t("events.update-event-dialog.field10.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.update-event-dialog.field10.placeholder"
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
                                {t("events.update-event-dialog.field11.title")}
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
                                        "events.update-event-dialog.field11.title"
                                    )}
                                    placeholder={t(
                                        "events.update-event-dialog.field11.placeholder"
                                    )}
                                    emptyMessage={t(
                                        "events.update-event-dialog.field11.not-found"
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
                                {t("events.update-event-dialog.field14.title")}
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder={t(
                                        "events.update-event-dialog.field14.placeholder"
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
                                {t("events.update-event-dialog.field15.title")}
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

export default UpdateEventForm;
