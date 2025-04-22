import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface Button2Props
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
}

const Button2: FC<Button2Props> = ({ className, children, ...props }) => {
    return (
        <Button
            className={cn(
                "font-semibold text-white hover:text-primary text-[clamp(14px,_2vw,_16px)] border-[2px] border-primary bg-primary hover:bg-white cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Button2;
