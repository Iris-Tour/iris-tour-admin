import { useId } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const countries = [
    {
        value: "+221",
        label: "Senegal",
        code: "SN",
        flag: "https://flagcdn.com/w40/sn.png",
    },
];

interface DialCodeSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

export default function DialCodeSelect({
    value,
    onChange,
    className,
    disabled,
}: DialCodeSelectProps) {
    const id = useId();

    // Find the current country based on the value
    const currentCountry =
        countries.find((item) => value?.startsWith(item.value)) || countries[0];

    return (
        <div className={className}>
            <Select
                value={currentCountry.value}
                onValueChange={onChange}
                defaultValue="+221"
                disabled={disabled}
            >
                <SelectTrigger
                    id={id}
                    className={`
                        bg-white w-full
                        py-6 
                        px-3
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                >
                    <SelectValue placeholder="Select country code">
                        <div className="flex items-center gap-2">
                            <Image
                                src={currentCountry.flag}
                                alt={currentCountry.label}
                                width={24}
                                height={16}
                                className="rounded-sm object-cover"
                            />
                            <span>{currentCountry.value}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {countries.map((item) => (
                        <SelectItem
                            key={item.value + item.code}
                            value={item.value}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-2">
                                <Image
                                    src={item.flag}
                                    alt={item.label}
                                    width={24}
                                    height={16}
                                    className="rounded-sm object-cover"
                                />
                                <span className="truncate">{item.value}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
