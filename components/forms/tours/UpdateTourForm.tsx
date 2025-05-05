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
import BaseInput from "@/components/inputs/BaseInput";
import { DialogClose } from "@/components/ui/dialog";
import Button2 from "@/components/buttons/Button2";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import DatePicker from "@/components/inputs/DatePicker";
import Select1 from "@/components/selects/Select1";
import { difficulties } from "@/constants/difficulties";
import NumericInput from "@/components/inputs/NumericInput";
import Textarea1 from "@/components/inputs/Textarea1";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiUpdateTour, apiGetAllStaff } from "@/lib/api";
import { FC } from "react";
import { updateTourSchema } from "@/utils/schemas/tours/update-tour-schema";
import FileUpload from "@/components/inputs/FileUpload";
import { getServerUrl } from "@/lib/utils";
import SharedForm from "../SharedForm";
import ProfileSelect from "@/components/selects/ProfileSelect";

interface UpdateTourFormProps {
    tour: TourType;
}

const formSchema = updateTourSchema;
type FormSchemaType = z.infer<typeof formSchema>;

const UpdateTourForm: FC<UpdateTourFormProps> = ({ tour }) => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: staffs = [] } = useQuery({
        queryKey: ["get-all-staffs"],
        queryFn: () => apiGetAllStaff(token!),
    });

    // Get all the main images
    const initialImages = tour.mainImages.map((image) => ({
        id: image.id.toString(),
        name: image.name,
        size: image.size,
        url: `${getServerUrl()}/${image.path}`,
        type: image.type,
    }));

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: tour.title,
            description: tour.description,
            departurePoint: tour.departurePoint,
            arrivalPoint: tour.arrivalPoint,
            departureDateTime: tour.departureDateTime,
            arrivalDateTime: tour.arrivalDateTime,
            difficulty: Number(tour.difficulty),
            excursionPrice: Number(tour.excursionPrice),
            totalDistance: Number(tour.totalDistance),
            maxParticipants: Number(tour.maxParticipants),
            staffId: tour.staffId,
            requiredEquipment: tour.requiredEquipment ?? "",
            mainImages: [],
            status: tour.status,
        },
    });

    const updateTourMutation = useMutation({
        mutationFn: (variables: { data: FormSchemaType }) =>
            apiUpdateTour(token!, tour.id.toString(), variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-all-tours"] });
            document.getElementById("dialog-close")?.click();
            toast.success("Excursion mise à jour avec succès.");
        },
        onError: (error: any) => {
            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error("Une erreur est survenue");
            }
        },
    });

    function onSubmit(values: FormSchemaType) {
        updateTourMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateTourMutation}
            ctaText={t("tours.update-tour-form.cta")}
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t("tours.add-tour-dialog.field1.title")}
                            </FormLabel>
                            <FormControl>
                                <BaseInput
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
                                <BaseInput
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
                                Destination
                            </FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Destination"
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
                    name="staffId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Guide assigné
                            </FormLabel>
                            <FormControl>
                                <ProfileSelect
                                    staffs={staffs}
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
                            <FormLabel className="text-base">Prix</FormLabel>
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
                                        field.onChange(floatValue ?? undefined); // send clean number
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
                    name="requiredEquipment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                Équipements requis
                            </FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder="Équipements requis"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
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
                            <FormLabel className="text-base">Images</FormLabel>
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

export default UpdateTourForm;
