import StatsCard from "@/components/cards/StatsCard";
import { Buildings, Bus, Car, Ticket } from "iconsax-react";
import SectionContainer from "@/components/containers/SectionContainer";

const StatsCardsSection = () => {
    const iconsClassName =
        "w-[clamp(32px,_4vw,_40px)] h-[clamp(32px,_4vw,_40px)]";

    return (
        <SectionContainer className="bg-transparent">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center place-items-center gap-4">
                <StatsCard
                    icon={<Car className={`${iconsClassName}`} />}
                    title="Excursions"
                />
                <StatsCard
                    icon={<Buildings className={`${iconsClassName}`} />}
                    value={246}
                    title="Res. Hôtels"
                    theme="secondary"
                />
                <StatsCard
                    icon={<Ticket className={`${iconsClassName}`} />}
                    value={23}
                    title="Evénements"
                />
                <StatsCard
                    icon={<Bus className={`${iconsClassName}`} />}
                    value={36}
                    title="Trajets"
                    theme="secondary"
                />
            </div>
        </SectionContainer>
    );
};

export default StatsCardsSection;
