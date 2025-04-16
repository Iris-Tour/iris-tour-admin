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

const formSchema = z.object({
    lastname: z
        .string()
        .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z
        .string()
        .min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    email: z.string().email({ message: "Ce champ est requis." }),
    roles: z.array(z.string()),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AddAdminForm = () => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            roles: [],
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
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field1.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "roles-and-permissions.admins-list.add-admin-dialog.field1.placeholder"
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
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field2.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "roles-and-permissions.admins-list.add-admin-dialog.field2.placeholder"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field3.title"
                                )}
                            </FormLabel>
                            <FormControl>
                                <Input1
                                    placeholder={t(
                                        "roles-and-permissions.admins-list.add-admin-dialog.field3.placeholder"
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose id="dialog-close"></DialogClose>
                <Button2
                    type="submit"
                    // disabled={}
                >
                    {t(
                        "roles-and-permissions.admins-list.add-admin-dialog.cta"
                    )}
                </Button2>
            </form>
        </Form>
    );
};

export default AddAdminForm;
