import PageContainer from "@/components/containers/PageContainer";
import RolesAndPermissionsPage from "@/components/pages/RolesAndPermissionsPage";

const RolesAndPermissions = () => {
    return (
        <PageContainer className="flex flex-col items-center gap-5">
            <RolesAndPermissionsPage />
        </PageContainer>
    );
};

export default RolesAndPermissions;
