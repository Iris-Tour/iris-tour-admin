import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Input1Props extends React.ComponentProps<"input"> {
    placeholder?: string;
    className?: string;
}

const Input1: FC<Input1Props> = ({ placeholder, className, ...props }) => {
    return (
        <Input
            placeholder={placeholder}
            className={cn(
                "text-[clamp(14px,_2vw,_16px)] bg-white px-5 py-6",
                className
            )}
            {...props}
        />
    );
};

export default Input1;
