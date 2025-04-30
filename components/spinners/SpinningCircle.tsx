import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FC } from "react";

interface SpinningCircleProps {
    className?: string;
}

const SpinningCircle: FC<SpinningCircleProps> = ({ className }) => {
    return (
        <Loader2 className={cn("text-white w-4 h-4 animate-spin", className)} />
    );
};

export default SpinningCircle;
