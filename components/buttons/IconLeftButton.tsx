import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface IconLeftButtonProps
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
}

const IconLeftButton: FC<IconLeftButtonProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <Button
            className={cn(
                "font-semibold text-white hover:text-primary-color text-[clamp(14px,_2vw,_16px)] border-[2px] border-primary-color bg-primary-color hover:bg-white cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};

export default IconLeftButton;
