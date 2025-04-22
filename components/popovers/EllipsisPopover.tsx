import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { FC, ReactNode } from "react";

interface EllipsisPopoverProps {
    children: ReactNode;
    className?: string;
    ellipsisOrientation?: "vertical" | "horizontal";
}

const EllipsisPopover: FC<EllipsisPopoverProps> = ({
    children,
    className,
    ellipsisOrientation = "horizontal",
}) => {
    return (
        <Popover>
            <PopoverTrigger className="text-primary hover:bg-primary/10 p-1 rounded-md cursor-pointer transition">
                {ellipsisOrientation === "horizontal" ? (
                    <Ellipsis className="w-4 h-4" />
                ) : (
                    <EllipsisVertical className="w-4 h-4" />
                )}
            </PopoverTrigger>
            <PopoverContent
                className={cn(
                    "flex flex-col border-primary w-fit gap-2 shadow-lg",
                    className
                )}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
};

export default EllipsisPopover;
