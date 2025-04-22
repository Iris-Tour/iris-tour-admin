import SectionContainer from "@/components/containers/SectionContainer";
import ToursTable from "@/components/tables/ToursTable";

const ToursListSection = () => {
    return (
        <SectionContainer>
            <ToursTable data={[]} />
        </SectionContainer>
    );
};

export default ToursListSection;
