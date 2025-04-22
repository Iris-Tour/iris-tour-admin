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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/inputs/time-picker/time-picker";
import { fr } from "date-fns/locale";
import Button3 from "@/components/buttons/Button3";
import DateTimePicker from "@/components/inputs/DateTimePicker";

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
                            />
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
