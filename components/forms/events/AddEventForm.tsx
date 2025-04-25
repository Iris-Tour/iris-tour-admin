import Button3 from "@/components/buttons/Button3";
import SimpleChip from "@/components/chips/SimpleChip";
import SharedForm from "@/components/forms/SharedForm";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import FileUpload from "@/components/inputs/FileUpload";
import Input1 from "@/components/inputs/Input1";
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
import { apiStoreEvent } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
    storeEventSchema,
    StoreEventSchemaType,
} from "@/utils/schemas/events/store-event-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const AddEventForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const languages = [
        { label: "Fr", value: "Fr" },
        { label: "En", value: "En" },
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
            organizer: "",
            ticketPrice: undefined,
            maximumCapacity: undefined,
            targetAudience: "",
            eventLanguages: [],
            accessibilityForDisabled: false,
            organizerContact: "",
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
            // queryClient.invalidateQueries({
            //     queryKey: ["get-all-tours"],
            // });

            document.getElementById("dialog-close")?.click();

            toast.success("Evénement créé avec succès.");
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                console.log(error);
                toast.error("Une erreur est survenue");
            }
        },
    });

    function onSubmit(values: StoreEventSchemaType) {
        storeEventMutation.mutate({ data: values });
    }
    
    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeEventMutation}
            ctaText={t("events.add-event-dialog.cta")}
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
                                <Input1
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
                                <Input1
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
                    name="organizer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field7.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "events.add-event-dialog.field7.placeholder"
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
                                {t("events.add-event-dialog.field13.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "events.add-event-dialog.field13.placeholder"
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
                                {t("events.add-event-dialog.field8.title")}
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
                                <Input1
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
                                                              "events.add-event-dialog.field11.placeholder"
                                                          )}
                                                </span>
                                                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0" />
                                            </Button3>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Command className="w-full">
                                            <CommandInput placeholder="Rechercher un rôle..." />
                                            <CommandList>
                                                <CommandEmpty>
                                                    {t(
                                                        "events.add-event-dialog.field11.not-found"
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
                                {t("events.add-event-dialog.field12.title")}
                            </FormLabel>
                            <FormControl>
                                <Select1
                                    options={[
                                        { label: "Oui", value: "true" },
                                        { label: "Non", value: "false" },
                                    ]}
                                    placeholder={t(
                                        "events.add-event-dialog.field12.placeholder"
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
                    name="promotionalImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("events.add-event-dialog.field15.title")}
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    ref={field.ref} // Forward ref to the input
                                    onFilesChange={(files) =>
                                        field.onChange(files)
                                    } // Update form value with selected files
                                    accept=".jpg,.jpeg,.png" // Optional: You can specify the file types allowed
                                    multiple // Allow multiple file selection
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
