import { ActivityIcon, ArrowUp, ArrowUpIcon, LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import localFont from "next/font/local";

const ubuntuMedium = localFont({
    src: "./../../fonts/Ubuntu-Medium.ttf",
    weight: "500",
});

interface StatsCardProps {
    Icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    value?: number;
    title?: string;
    percentage?: number;
    PercentageIcon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}

const StatsCard: FC<StatsCardProps> = ({
    Icon = ActivityIcon,
    value = 75,
    title = "Titre",
    percentage = 7.5,
    PercentageIcon = ArrowUpIcon,
}) => {
    return (
        <div className="relative flex items-center bg-white w-full gap-3 px-5 py-3 rounded-3xl">
            <div className="absolute top-2 right-2 text-primary border-[2px] border-primary p-2 rotate-45 rounded-full">
                <ArrowUpIcon className="h-4 w-4 stroke-3" />
            </div>
            <div className="flex justify-center items-center text-secondary-2 bg-primary p-9 rounded-2xl">
                <Icon />
            </div>
            <div>
                <h3
                    className={`${ubuntuMedium.className} text-[49px] leading-14`}
                >
                    {value}
                </h3>
                <p className="text-[22px] text-gray-500">{title}</p>
                <div className="flex items-center text-green-500 gap-2">
                    <p className={`${ubuntuMedium.className} text-base`}>
                        +{percentage}%
                    </p>
                    <PercentageIcon />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
