import StatsCard from "@/components/cards/StatsCard";

const DashboardPage = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <StatsCard title="Excursions" />
                <StatsCard value={246} title="Excursions" />
                <StatsCard value={23} title="Excursions" />
                <StatsCard value={36} title="Excursions" />
            </div>
        </>
    );
};

export default DashboardPage;
