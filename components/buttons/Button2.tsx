import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";

interface Button2Props
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
    isLink?: boolean;
    href?: string;
}

const Button2: FC<Button2Props> = ({
    className,
    children,
    isLink,
    href = "#",
    ...props
}) => {
    return isLink ? (
        <Link
            href={href}
            className={cn(
                "font-semibold text-white hover:text-primary text-[clamp(14px,_2vw,_16px)] border-[2px] border-primary bg-primary hover:bg-white px-4 py-1.5 rounded-md cursor-pointer transition",
                className
            )}
        >
            {children}
        </Link>
    ) : (
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
