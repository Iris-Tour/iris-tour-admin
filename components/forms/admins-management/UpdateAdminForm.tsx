import SharedForm from "@/components/forms/SharedForm";
import Input1 from "@/components/inputs/Input1";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { apiUpdateAdmin } from "@/lib/api";
import {
    updateAdminSchema,
    UpdateAdminSchemaType,
} from "@/utils/schemas/admins/update-admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Button3 from "@/components/buttons/Button3";
import { cn } from "@/lib/utils";
import SimpleChip from "@/components/chips/SimpleChip";

interface UpdateAdminFormProps {
    admin: UserData;
    adminRoles: Array<RoleType>;
    allRoles: Array<RoleType>;
}

const UpdateAdminForm: FC<UpdateAdminFormProps> = ({
    admin,
    adminRoles,
    allRoles,
}) => {
    const { t } = useTranslation();

    const { token } = useAuth();

    const queryClient = useQueryClient();

    const form = useForm<UpdateAdminSchemaType>({
        resolver: zodResolver(updateAdminSchema),
        defaultValues: {
            lastname: "",
            firstname: "",
            email: "",
            roles:
                adminRoles.length > 0
                    ? adminRoles.map((role) => Number(role.id))
                    : [],
        },
    });

    const updateAdminMutation = useMutation({
        mutationFn: (variables: { data: UpdateAdminMutation }) =>
            apiUpdateAdmin(token!, admin.id.toString(), variables.data),
        onSuccess: () => {
            // Update admins list
            queryClient.invalidateQueries({
                queryKey: ["get-all-admins-with-roles"],
            });

            document.getElementById("dialog-close")?.click();

            toast.success(
                "roles-and-permissions.admins-list.update-admin-dialog.success-messages.Admin updated successfully"
            );
        },
        onError: (error: any) => {
            const code = error?.error?.code;
            const field = error?.error?.messages[0].field;
            const rule = error?.error?.messages[0].rule;

            if (typeof error === "string") {
                toast.error(t(`general-errors.${error}`));
            } else {
                toast.error(
                    `roles-and-permissions.admins-list.update-admin-dialog.error-messages.${code}.${field}.${rule}`
                );
            }
        },
    });

    function onSubmit(values: UpdateAdminSchemaType) {
        updateAdminMutation.mutate({ data: values });
    }

    return (
        <SharedForm
            form={form}
            onSubmit={onSubmit}
            mutation={updateAdminMutation}
            ctaText={t(
                "roles-and-permissions.admins-list.update-admin-dialog.cta"
            )}
        >
            <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base">
                            {t(
                                "roles-and-permissions.admins-list.update-admin-dialog.field1.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <Input1
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field1.placeholder"
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field2.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <Input1
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field2.placeholder"
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field3.title"
                            )}
                        </FormLabel>
                        <FormControl>
                            <Input1
                                placeholder={t(
                                    "roles-and-permissions.admins-list.update-admin-dialog.field3.placeholder"
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
                                "roles-and-permissions.admins-list.update-admin-dialog.field4.title"
                            )}
                        </FormLabel>
                        <FormControl>
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
                                                                      allRoles?.find(
                                                                          (
                                                                              role
                                                                          ) =>
                                                                              Number(
                                                                                  role.id
                                                                              ) ===
                                                                              selectedRole
                                                                      )?.slug
                                                                  }
                                                              </SimpleChip>
                                                          )
                                                      )
                                                    : t(
                                                          "roles-and-permissions.admins-list.update-admin-dialog.field4.placeholder"
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
                                                Aucun rôle trouvé.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {allRoles?.map((role) => (
                                                    <CommandItem
                                                        value={role.slug}
                                                        key={role.id.toString()}
                                                        onSelect={() => {
                                                            const currentRoles =
                                                                field.value ||
                                                                [];
                                                            const isSelected =
                                                                currentRoles.some(
                                                                    (r) =>
                                                                        r ===
                                                                        Number(
                                                                            role.id
                                                                        )
                                                                );

                                                            form.setValue(
                                                                "roles",
                                                                isSelected
                                                                    ? currentRoles.filter(
                                                                          (r) =>
                                                                              r !==
                                                                              Number(
                                                                                  role.id
                                                                              )
                                                                      )
                                                                    : [
                                                                          ...currentRoles,
                                                                          Number(
                                                                              role.id
                                                                          ),
                                                                      ]
                                                            );
                                                        }}
                                                    >
                                                        {role.slug}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                field.value?.some(
                                                                    (r) =>
                                                                        r ===
                                                                        Number(
                                                                            role.id
                                                                        )
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
        </SharedForm>
    );
};

export default UpdateAdminForm;
