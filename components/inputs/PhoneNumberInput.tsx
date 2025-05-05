"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import NummericInput from "@/components/inputs/NumericInput";
import DialCodeSelect from "@/components/selects/DialCodeSelect";

interface PhoneNumberInputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
    value,
    onChange,
    className,
    placeholder = "Enter phone number",
    disabled,
    required,
}) => {

    const [dialCode, setDialCode] = useState(value);

    const handleCountryCodeChange = (dialCode: string) => {
        // Remove any existing country code from the value
        const numberWithoutCode = value.replace(/^\+\d+/, "");
        // Add the new country code
        onChange(dialCode + numberWithoutCode);
    };

    const handleNumberChange = (number: string) => {
        // Remove any non-digit characters except the plus sign
        const cleanedNumber = number.replace(/[^\d+]/g, "");
        onChange(cleanedNumber);
    };

    // Extract the number without the country code
    const numberWithoutCode = value.replace(/^\+\d+/, "");

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <DialCodeSelect
                value={value}
                onChange={handleCountryCodeChange}
                className="w-[180px]"
                disabled={disabled}
            />
            <NummericInput
                value={numberWithoutCode}
                onChange={(e) => handleNumberChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
        </div>
    );
};

export default PhoneNumberInput;
