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
import { FC } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Button3 from "@/components/buttons/Button3";
import SimpleChip from "@/components/chips/SimpleChip";

interface AddAdminFormProps {
    roles?: {
        role: RoleType;
        permissions: Array<PermissionType>;
    }[];
}

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

const AddAdminForm: FC<AddAdminFormProps> = ({ roles }) => {
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
                <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base">
                                {t(
                                    "roles-and-permissions.admins-list.add-admin-dialog.field4.title"
                                )}
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
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
                                                              selectedRole,
                                                              index
                                                          ) => (
                                                              <SimpleChip
                                                                  key={index}
                                                              >
                                                                  {
                                                                      roles?.find(
                                                                          (
                                                                              role
                                                                          ) =>
                                                                              role
                                                                                  .role
                                                                                  .id ===
                                                                              selectedRole
                                                                      )?.role
                                                                          .slug
                                                                  }
                                                              </SimpleChip>
                                                          )
                                                      )
                                                    : t(
                                                          "roles-and-permissions.admins-list.add-admin-dialog.field4.placeholder"
                                                      )}
                                            </span>
                                            {/* <Input1
                                                className="border-none w-full p-0 shadow-none cursor-pointer focus-visible:ring-0 select-none"
                                                placeholder="Sélectionnez les rôles"
                                                value={
                                                    field.value?.length
                                                        ? field.value
                                                              .map(
                                                                  (
                                                                      selectedRole
                                                                  ) =>
                                                                      roles?.find(
                                                                          (
                                                                              role
                                                                          ) =>
                                                                              role
                                                                                  .role
                                                                                  .id ===
                                                                              selectedRole
                                                                      )?.role
                                                                          .slug
                                                              )
                                                              .join(", ")
                                                        : t(
                                                              "roles-and-permissions.admins-list.add-admin-dialog.field4.placeholder"
                                                          )
                                                }
                                                readOnly
                                            /> */}
                                            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0" />
                                        </Button3>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
                                    <Command className="w-full">
                                        <CommandInput placeholder="Rechercher un rôle..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                Aucun rôle trouvé.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {roles?.map((role) => (
                                                    <CommandItem
                                                        value={role.role.slug}
                                                        key={role.role.id.toString()}
                                                        onSelect={() => {
                                                            const currentRoles =
                                                                field.value ||
                                                                [];
                                                            const isSelected =
                                                                currentRoles.some(
                                                                    (r) =>
                                                                        r ===
                                                                        role
                                                                            .role
                                                                            .id
                                                                );

                                                            form.setValue(
                                                                "roles",
                                                                isSelected
                                                                    ? currentRoles.filter(
                                                                          (r) =>
                                                                              r !==
                                                                              role
                                                                                  .role
                                                                                  .id
                                                                      )
                                                                    : [
                                                                          ...currentRoles,
                                                                          role
                                                                              .role
                                                                              .id,
                                                                      ]
                                                            );
                                                        }}
                                                    >
                                                        {role.role.slug}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                field.value?.some(
                                                                    (r) =>
                                                                        r ===
                                                                        role
                                                                            .role
                                                                            .id
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
