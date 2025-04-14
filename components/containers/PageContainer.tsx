import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col items-center gap-5", className)}>
            {children}
        </div>
    );
};

export default PageContainer;
