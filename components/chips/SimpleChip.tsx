import { FC, ReactNode } from "react";

interface SimpleChipProps {
    children: ReactNode;
}
const SimpleChip: FC<SimpleChipProps> = ({ children }) => {
    return (
        <span className="text-white bg-primary-color px-3 py-1 rounded-lg">
            {children}
        </span>
    );
};

export default SimpleChip;
