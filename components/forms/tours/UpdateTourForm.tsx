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
import NumericInput from "@/components/inputs/NumericInput";
import Textarea1 from "@/components/inputs/Textarea1";
import { FileUpload } from "@/components/inputs/FileUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateTour } from "@/lib/api";
import { FC } from "react";
import { updateTourSchema } from "@/utils/schemas/update-tour-schema";

interface UpdateTourFormProps {
    tour: TourType;
}

const formSchema = updateTourSchema;

const UpdateTourForm: FC<UpdateTourFormProps> = ({ tour }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { ...tour },
    });

    const updateTourMutation = useMutation({
        mutationFn: (data: any) =>
            apiUpdateTour(token!, tour.id.toString(), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-tours"] });
            document.getElementById("dialog-close")?.click();
            toast.success("Excursion mise à jour avec succès.");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Une erreur est survenue");
        },
    });

    function onSubmit(values: any) {
        updateTourMutation.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        {t(
                                            "tours.add-tour-dialog.field1.title"
                                        )}
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
                                        {t(
                                            "tours.add-tour-dialog.field2.title"
                                        )}
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea1
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
                            name="departurePoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Lieu de départ
                                    </FormLabel>
                                    <FormControl>
                                        <Input1
                                            placeholder="Lieu de départ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="arrivalPoint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Lieu d'arrivée
                                    </FormLabel>
                                    <FormControl>
                                        <Input1
                                            placeholder="Lieu d'arrivée"
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
                                        {t(
                                            "tours.add-tour-dialog.field3.title"
                                        )}
                                    </FormLabel>
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
                                        {t(
                                            "tours.add-tour-dialog.field4.title"
                                        )}
                                    </FormLabel>
                                    <DatePicker
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
                                            "tours.add-tour-dialog.field4.placeholder"
                                        )}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="assignedGuide"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Nom du guide
                                    </FormLabel>
                                    <FormControl>
                                        <Input1
                                            placeholder="Nom du guide"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        Difficulté
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
                            name="excursionPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Prix
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
                                            placeholder="Entrez le prix"
                                            value={field.value ?? ""}
                                            onValueChange={({ floatValue }) => {
                                                field.onChange(
                                                    floatValue ?? undefined
                                                ); // send clean number
                                            }}
                                            min={1}
                                        />
                                    </FormControl>
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
                                        <NumericInput
                                            thousandSeparator=""
                                            decimalSeparator=","
                                            allowNegative={false}
                                            allowLeadingZeros={false}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            inputSuffix="Km"
                                            placeholder="Entrez la distance"
                                            value={field.value ?? ""}
                                            onValueChange={({ floatValue }) => {
                                                field.onChange(
                                                    floatValue ?? undefined
                                                ); // send clean number
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxParticipants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Nom maximum de participants
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
                                            placeholder="Entrez le nombre maximum de participants"
                                            value={field.value ?? ""}
                                            onValueChange={({ floatValue }) => {
                                                field.onChange(
                                                    floatValue ?? undefined
                                                ); // send clean number
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="requiredEquipment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Équipements requis
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea1
                                            placeholder="Équipements requis"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mainImages"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Images
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

                    <div>
                        <DialogClose id="dialog-close"></DialogClose>
                        <Button2
                            type="submit"
                            // disabled={}
                        >
                            {t("tours.add-tour-dialog.cta")}
                        </Button2>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default UpdateTourForm;
