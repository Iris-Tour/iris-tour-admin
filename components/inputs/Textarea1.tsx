import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Textarea1Props extends React.ComponentProps<"textarea"> {
    placeholder?: string;
    className?: string;
}

const Textarea1: FC<Textarea1Props> = ({
    placeholder,
    className,
    ...props
}) => {
    return (
        <Textarea
            placeholder={placeholder}
            className={cn("text-[clamp(14px,_2vw,_16px)] bg-white px-5 py-4", className)}
            {...props}
        />
    );
};

export default Textarea1;
