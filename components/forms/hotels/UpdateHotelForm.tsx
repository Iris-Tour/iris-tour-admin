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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateHotel } from "@/lib/api";
import { updateHotelSchema } from "@/utils/schemas/hotels/update-hotel-schema";
import SharedForm from "@/components/forms/SharedForm";
import { FC } from "react";
import FileUpload from "@/components/inputs/FileUpload";
import { Checkbox } from "@/components/ui/checkbox";
import { getServerUrl } from "@/lib/utils";

const formSchema = updateHotelSchema;

type FormSchemaType = z.infer<typeof formSchema>;

interface UpdateHotelFormProps {
    hotel: HotelType;
}

const UpdateHotelForm: FC<UpdateHotelFormProps> = ({ hotel }) => {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    // Get all the hotel images
    const initialImages = hotel.hotelImages.map((image) => ({
        id: image.id.toString(),
        name: image.name,
        size: image.size,
        url: `${getServerUrl()}/${image.path}`,
        type: image.type,
    }));

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: hotel.name,
            description: hotel.description,
            location: hotel.location,
            accessibilityForDisabled: hotel.accessibilityForDisabled,
            contact: hotel.contact,
            hotelImages: [],
        },
    });

    const updateHotelMutation = useMutation({
        mutationFn: (variables: { data: UpdateHotelMutation }) =>
            apiUpdateHotel(token!, hotel.id.toString(), variables.data),
        onSuccess: () => {
            // Update hotels list
            queryClient.invalidateQueries({
                queryKey: ["get-all-hotels"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success("Hôtel mis à jour avec succès.");
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
        updateHotelMutation.mutate({
            data: values,
        });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateHotelMutation}
            ctaText="Mettre à jour"
            multipart={true}
        >
            <div className="grid grid-cols-1 gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de l'hôtel</FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez le nom de l'hôtel"
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea1
                                    placeholder="Décrivez l'hôtel"
                                    {...field}
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
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez l'adresse de l'hôtel"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <BaseInput
                                    placeholder="Entrez les informations de contact"
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
                    name="hotelImages"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Photos de l'hôtel</FormLabel>
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

export default UpdateHotelForm;
