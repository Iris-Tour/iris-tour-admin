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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStoreHotel } from "@/lib/api";
import { storeHotelSchema } from "@/utils/schemas/hotels/store-hotel-schema";
import FileUpload from "@/components/inputs/FileUpload";
import SharedForm from "@/components/forms/SharedForm";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = storeHotelSchema;

type FormSchemaType = z.infer<typeof formSchema>;

const AddHotelForm = () => {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            location: "",
            accessibilityForDisabled: false,
            contact: "",
            hotelImages: [],
        },
    });

    const storeHotelMutation = useMutation({
        mutationFn: (variables: { data: StoreHotelMutation }) =>
            apiStoreHotel(token!, variables.data),
        onSuccess: () => {
            // Update hotels list
            queryClient.invalidateQueries({
                queryKey: ["get-all-hotels"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success("Hôtel créé avec succès.");
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
        storeHotelMutation.mutate({
            data: values,
        });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={storeHotelMutation}
            ctaText="Ajouter"
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

export default AddHotelForm;
