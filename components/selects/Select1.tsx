"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ComponentPropsWithoutRef, FC } from "react";

// Get props from the actual Select component
type NativeSelectProps = ComponentPropsWithoutRef<typeof Select>;

interface Option {
    label: string;
    value: string;
}

interface Select1Props extends NativeSelectProps {
    options: Option[];
    placeholder?: string;
}

const Select1: FC<Select1Props> = ({ options, placeholder, ...props }) => {
    return (
        <Select {...props}>
            <SelectTrigger className="text-base w-full px-5 py-6 cursor-pointer">
                <SelectValue placeholder={placeholder || "Sélectionner..."} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Select1;
