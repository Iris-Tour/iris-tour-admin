import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Input1Props {
    type?: string;
    placeholder?: string;
    className?: string;
}

const Input1: FC<Input1Props> = ({ type, placeholder, className }) => {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            className={cn("text-base px-5 py-6", className)}
        ></Input>
    );
};

export default Input1;
