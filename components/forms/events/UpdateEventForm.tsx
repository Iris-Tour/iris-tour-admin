import Button3 from "@/components/buttons/Button3";
import SimpleChip from "@/components/chips/SimpleChip";
import SharedForm from "@/components/forms/SharedForm";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import FileUpload from "@/components/inputs/FileUpload";
import BaseInput from "@/components/inputs/BaseInput";
import NumericInput from "@/components/inputs/NumericInput";
import Textarea1 from "@/components/inputs/Textarea1";
import Select1 from "@/components/selects/Select1";
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
import { apiUpdateEvent } from "@/lib/api";
import { cn, getServerUrl } from "@/lib/utils";
import {
    updateEventSchema,
    UpdateEventSchemaType,
} from "@/utils/schemas/events/update-event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "sonner";

interface UpdateEventFormProps {
    event: EventType;
}

const UpdateEventForm: FC<UpdateEventFormProps> = ({ event }) => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const queryClient = useQueryClient();

    const languages = [
        { label: "Fr", value: "Fr" },
        { label: "En", value: "En" },
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
            organizer: event.organizer,
            ticketPrice: Number(event.ticketPrice),
            maximumCapacity: Number(event.maximumCapacity),
            targetAudience: event.targetAudience ?? "",
            eventLanguages: event.eventLanguages.map((lang) => lang.language),
            accessibilityForDisabled: event.accessibilityForDisabled,
            organizerContact: event.organizerContact,
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
                    name="organizer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.update-event-dialog.field7.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.update-event-dialog.field7.placeholder"
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
                    name="organizerContact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.update-event-dialog.field13.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder={t(
                                        "events.update-event-dialog.field13.placeholder"
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
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger
                                        className="bg-white"
                                        asChild
                                    >
                                        <FormControl>
                                            <Button3
                                                role="combobox"
                                                className={cn(
                                                    "py-6 justify-between text-base",
                                                    !field.value?.length &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <span className="flex items-center w-full gap-2 px-2">
                                                    {field.value?.length > 0
                                                        ? field.value.map(
                                                              (
                                                                  selectedLang,
                                                                  index
                                                              ) => (
                                                                  <SimpleChip
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {
                                                                          languages?.find(
                                                                              (
                                                                                  lang
                                                                              ) =>
                                                                                  lang.value ===
                                                                                  selectedLang
                                                                          )
                                                                              ?.label
                                                                      }
                                                                  </SimpleChip>
                                                              )
                                                          )
                                                        : t(
                                                              "events.update-event-dialog.field11.placeholder"
                                                          )}
                                                </span>
                                                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0" />
                                            </Button3>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command className="w-full">
                                            <CommandInput placeholder="Rechercher une langue..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    {t(
                                                        "events.update-event-dialog.field11.not-found"
                                                    )}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {languages?.map((lang) => (
                                                        <CommandItem
                                                            value={lang.label}
                                                            key={lang.value.toString()}
                                                            onSelect={() => {
                                                                const currentRoles =
                                                                    field.value ||
                                                                    [];
                                                                const isSelected =
                                                                    currentRoles.some(
                                                                        (r) =>
                                                                            r ===
                                                                            lang.value
                                                                    );

                                                                form.setValue(
                                                                    "eventLanguages",
                                                                    isSelected
                                                                        ? currentRoles.filter(
                                                                              (
                                                                                  r
                                                                              ) =>
                                                                                  r !==
                                                                                  lang.value
                                                                          )
                                                                        : [
                                                                              ...currentRoles,
                                                                              lang.value,
                                                                          ]
                                                                );
                                                            }}
                                                        >
                                                            {lang.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    field.value?.some(
                                                                        (r) =>
                                                                            r ===
                                                                            lang.value
                                                                    )
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accessibilityForDisabled"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.update-event-dialog.field12.title")}
                            </FormLabel>
                            <FormControl>
                                <Select1
                                    options={[
                                        { label: "Oui", value: "true" },
                                        { label: "Non", value: "false" },
                                    ]}
                                    placeholder={t(
                                        "events.update-event-dialog.field12.placeholder"
                                    )}
                                    value={field.value ? "true" : "false"}
                                    onValueChange={(value) =>
                                        field.onChange(
                                            value === "true" ? true : false
                                        )
                                    }
                                />
                            </FormControl>
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
