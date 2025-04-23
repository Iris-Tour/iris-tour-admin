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
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import Input1 from "@/components/inputs/Input1";
import { DialogClose } from "@/components/ui/dialog";
import Button2 from "@/components/buttons/Button2";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import DatePicker from "@/components/inputs/DatePicker";
import Select1 from "@/components/selects/Select1";
import { difficulties } from "@/constants/difficulties";
import NumberInput from "@/components/inputs/NumberInput";

const formSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(1, { message: "Une description est requise." }),
    departureDateTime: z
        .string()
        .min(1, { message: "Date et heure de départ requises." })
        .refine((val) => {
            const date = new Date(val);
            return date;
        }),
    arrivalDateTime: z
        .string()
        .min(1, { message: "Date d'arrivée requise." })
        .refine((val) => {
            const date = new Date(val);
            return date;
        }),
    difficulty: z.number(),
    totalDistance: z
        .number()
        .min(0, { message: "La distance totale doit être un nombre positif." }),
    excursionPrice: z
        .number({
            message: "Le prix de l'excursion doit être un nombre positif.",
        })
        .min(0, {
            message: "Le prix de l'excursion doit être un nombre positif.",
        }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AddTourForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            departureDateTime: "",
            arrivalDateTime: "",
            difficulty: 0,
        },
    });

    function onSubmit(values: FormSchemaType) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field1.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "tours.add-tour-dialog.field1.placeholder"
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
                                {t("tours.add-tour-dialog.field2.title")}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "tours.add-tour-dialog.field2.placeholder"
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
                    name="departureDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field3.title")}
                            </FormLabel>
                            <DateTimePicker
                                date={field.value.toString()}
                                onSelect={(selectedDate: Date | undefined) =>
                                    field.onChange(
                                        selectedDate
                                            ? selectedDate.toISOString()
                                            : ""
                                    )
                                }
                                placeholder={t(
                                    "tours.add-tour-dialog.field3.placeholder"
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="arrivalDateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field4.title")}
                            </FormLabel>
                            <DatePicker
                                date={field.value.toString()}
                                onSelect={(selectedDate: Date | undefined) =>
                                    field.onChange(
                                        selectedDate
                                            ? selectedDate.toISOString()
                                            : ""
                                    )
                                }
                                placeholder={t(
                                    "tours.add-tour-dialog.field4.placeholder"
                                )}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field4.title")}
                            </FormLabel>
                            <Select1
                                options={difficulties}
                                value={field.value?.toString()}
                                onValueChange={(value) =>
                                    field.onChange(Number(value))
                                }
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="totalDistance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Distance totale
                            </FormLabel>
                            <FormControl>
                                <NumberInput
                                    placeholder="Entrez la distance totale"
                                    min={1}
                                    onChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="excursionPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">Prix</FormLabel>
                            <FormControl>
                                <NumberInput
                                    placeholder="Entrez le prix"
                                    min={1}
                                    onChange={(value) =>
                                        field.onChange(Number(value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <DialogClose id="dialog-close"></DialogClose>
                    <Button2
                        type="submit"
                        // disabled={}
                    >
                        {t("tours.add-tour-dialog.cta")}
                    </Button2>
                </div>
            </form>
        </Form>
    );
};

export default AddTourForm;
