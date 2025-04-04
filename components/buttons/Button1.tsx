import { FC } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Button1Props {
    type: "button" | "submit" | "reset" | undefined;
    text: string;
    className?: string;
}

const Button1: FC<Button1Props> = ({ type, text, className }) => {
    return (
        <Button
            type={type}
            className={cn(
                "font-semibold text-primary-color text-[clamp(16px,_2vw,_20px)] border border-primary-color bg-secondary-color-2 hover:bg-secondary-color cursor-pointer",
                className
            )}
        >
            {text}
        </Button>
    );
};

export default Button1;
