import { FC } from "react";
import { useTranslation } from "react-i18next";
import RoleCard from "@/components/cards/RoleCard";
import Button2 from "@/components/buttons/Button2";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddRoleWithPermissionsForm from "@/components/forms/AddRoleWithPermissionsForm";
import SectionContainer from "@/components/containers/SectionContainer";

interface RolesSectionProps {
    rolesWithPermissions: GetAllRolesWithPermissionPromise | undefined
}

const RolesSection: FC<RolesSectionProps> = ({rolesWithPermissions}) => {
    const { t } = useTranslation();

    return (
        <SectionContainer>
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">
                        {t("roles-and-permissions.heading")}
                    </h2>
                    <p className="max-w-xl">
                        {t("roles-and-permissions.subheading")}
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger className="cursor-pointer" asChild>
                        <Button2 className="rounded-xl">
                            <PlusCircle /> {t("roles-and-permissions.addRole")}
                        </Button2>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {t("roles-and-permissions.addRoleDialog.title")}
                            </DialogTitle>
                            <DialogDescription></DialogDescription>
                            <AddRoleWithPermissionsForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-wrap gap-4">
                {rolesWithPermissions?.roles &&
                rolesWithPermissions.roles.length > 0 ? (
                    rolesWithPermissions.roles.map((role) => (
                        <RoleCard
                            key={role.role.id}
                            role={role.role.slug}
                            roleId={role.role.id}
                            rolePermissions={role.permissions}
                        />
                    ))
                ) : (
                    <p>Aucun rôle trouvé</p>
                )}
            </div>
        </SectionContainer>
    );
};

export default RolesSection;
