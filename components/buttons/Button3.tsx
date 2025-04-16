import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface Button3Props
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
}

const Button3: FC<Button3Props> = ({ className, children, ...props }) => {
    return (
        <Button
            className={cn(
                "font-semibold text-black hover:text-primary-color text-[clamp(14px,_2vw,_16px)] border-[1px] border-gray-300 bg-transparent hover:bg-white cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};

export default Button3;
