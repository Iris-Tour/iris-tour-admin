import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface Button1Props
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
}

const Button1: FC<Button1Props> = ({ className, children, ...props }) => {
    return (
        <Button
            className={cn(
                "font-semibold text-primary-color text-[clamp(16px,_2vw,_20px)] border-[2px] border-primary-color bg-secondary-color-2 hover:bg-secondary-color cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Button1;
