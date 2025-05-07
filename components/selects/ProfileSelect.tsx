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
import { getInitials, getRandomColor, getAvatarClasses } from "@/utils/avatar";

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

    const renderProfileImage = (staff: StaffType) => {
        if (staff.imagePath?.[0]?.path) {
            return (
                <Image
                    className="border border-gray-300 w-10 h-10 rounded-full"
                    src={`${getServerUrl()}/${staff.imagePath[0].path}`}
                    alt={staff.firstname + " " + staff.lastname}
                    width={40}
                    height={40}
                />
            );
        }
        return (
            <div
                className={getAvatarClasses({
                    name: staff.firstname + " " + staff.lastname,
                    size: "md",
                    className: "border border-gray-300",
                })}
                style={{
                    backgroundColor: getRandomColor(
                        staff.firstname + " " + staff.lastname
                    ),
                }}
            >
                {getInitials(staff.firstname + " " + staff.lastname)}
            </div>
        );
    };

    return (
        <div className="*:not-first:mt-2">
            <Select
                value={value?.toString()}
                onValueChange={(val) => onChange?.(Number(val))}
            >
                <SelectTrigger
                    id={id}
                    className={`text-base bg-white w-full px-5 py-6 cursor-pointer ${
                        selectedStaff ? "py-8" : "py-6"
                    }`}
                >
                    <SelectValue>
                        {selectedStaff ? (
                            <span className="flex items-center gap-2">
                                {renderProfileImage(selectedStaff)}
                                <div className="flex flex-col items-start">
                                    <span className="block font-medium">
                                        {selectedStaff.firstname +
                                            " " +
                                            selectedStaff.lastname}
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
                            value={staff.id.toString()}
                            className="cursor-pointer hover:bg-gray-200"
                        >
                            <div className="flex items-center w-full pr-8">
                                <div className="flex items-center gap-2">
                                    {renderProfileImage(staff)}
                                    <div className="flex flex-col items-start">
                                        <span className="block font-medium">
                                            {staff.firstname +
                                                " " +
                                                staff.lastname}
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
