import { useId } from "react";
import { Check } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getServerUrl } from "@/lib/utils";
import Image from "next/image";

interface ProfileSelectProps {
    staffs: StaffType[];
    value?: number;
    onChange?: (value: number) => void;
    placeholder?: string;
    label?: string;
}

export default function ProfileSelect({
    staffs,
    value,
    onChange,
    placeholder = "Choose a staff",
    label = "Options with portrait",
}: ProfileSelectProps) {
    const id = useId();
    const selectedStaff = staffs.find((staff) => Number(staff.id) === value);

    return (
        <div className="*:not-first:mt-2">
            <Select
                value={value?.toString()}
                onValueChange={(val) => onChange?.(Number(val))}
            >
                <SelectTrigger
                    id={id}
                    className="text-base bg-white w-full px-5 py-8 cursor-pointer"
                >
                    <SelectValue>
                        {selectedStaff ? (
                            <span className="flex items-center gap-2">
                                <Image
                                    className="border border-gray-300 w-10 h-10 rounded-full"
                                    src={
                                        selectedStaff.imagePath[0]
                                            ? `${getServerUrl()}/${
                                                  selectedStaff.imagePath[0]
                                                      .path
                                              }`
                                            : "/avatar-40-01.jpg"
                                    }
                                    alt={selectedStaff.name}
                                    width={40}
                                    height={40}
                                />
                                <div className="flex flex-col items-start">
                                    <span className="block font-medium">
                                        {selectedStaff.name}
                                    </span>
                                    <span className="text-muted-foreground mt-0.5 block text-xs">
                                        {selectedStaff.email}
                                    </span>
                                </div>
                            </span>
                        ) : (
                            placeholder
                        )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {staffs.map((staff) => (
                        <SelectItem
                            key={staff.id}
                            value={staff.id}
                            className="cursor-pointer hover:bg-gray-200"
                        >
                            <div className="flex items-center w-full pr-8">
                                <div className="flex items-center gap-2">
                                    <Image
                                        className="border border-gray-300 w-10 h-10 rounded-full"
                                        src={
                                            staff.imagePath[0]
                                                ? `${getServerUrl()}/${
                                                      staff.imagePath[0].path
                                                  }`
                                                : "/avatar-40-01.jpg"
                                        }
                                        alt={staff.name}
                                        width={40}
                                        height={40}
                                    />
                                    <div className="flex flex-col items-start">
                                        <span className="block font-medium">
                                            {staff.name}
                                        </span>
                                        <span className="text-muted-foreground mt-0.5 block text-xs">
                                            {staff.email}
                                        </span>
                                    </div>
                                </div>
                                {Number(staff.id) === value && (
                                    <Check className="absolute right-8 h-4 w-4 text-primary" />
                                )}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
