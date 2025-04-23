import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SimpleChipProps {
    children: ReactNode;
    className?: string;
}
const SimpleChip: FC<SimpleChipProps> = ({ children, className }) => {
    return (
        <span
            className={cn(
                "text-white bg-primary px-3 py-1 rounded-lg",
                className
            )}
        >
            {children}
        </span>
    );
};

export default SimpleChip;
