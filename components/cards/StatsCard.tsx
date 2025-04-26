import { ActivityIcon, ArrowUpIcon, Car, LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const ubuntuMedium = localFont({
    src: "./../../fonts/Ubuntu-Medium.ttf",
    weight: "500",
});

interface StatsCardProps {
    icon?: ReactNode;
    value?: number;
    title?: string;
    percentage?: number;
    PercentageIcon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    theme?: string;
}

const StatsCard: FC<StatsCardProps> = ({
    icon = <Car />,
    value = 75,
    title = "Titre",
    percentage = 7.5,
    PercentageIcon = ArrowUpIcon,
    theme = "primary",
}) => {
    return (
        <div className="relative flex items-center bg-white w-full min-w-[275px] gap-3 px-5 py-3 rounded-3xl">
            <div
                className={cn(
                    "absolute top-2 right-2 border-[2px] p-2 rotate-45 rounded-full",
                    theme === "primary"
                        ? "text-primary border-primary"
                        : "text-secondary border-secondary"
                )}
            >
                <ArrowUpIcon className="h-4 w-4 stroke-3" />
            </div>
            <div
                className={cn(
                    "flex justify-center items-center p-7 rounded-2xl",
                    theme === "primary"
                        ? "stroke-secondary bg-primary"
                        : "stroke-primary bg-secondary"
                )}
            >
                {icon}
            </div>
            <div>
                <h3
                    className={`${ubuntuMedium.className} text-[clamp(32px,_4vw,_49px)] leading-14`}
                >
                    {value}
                </h3>
                <p className="text-[clamp(16px,_2vw,_22px)] text-gray-500">
                    {title}
                </p>
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
