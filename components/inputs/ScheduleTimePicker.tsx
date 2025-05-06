"use client";

import { useState } from "react";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { TimePicker } from "@/components/inputs/time-picker/time-picker";
import { Checkbox } from "@/components/ui/checkbox";

interface ScheduleTimePickerProps {
    day: string;
    control: any;
    name: string;
    field: any;
}

const ScheduleTimePicker = ({
    day,
    control,
    name,
    field,
}: ScheduleTimePickerProps) => {
    const [isClosed, setIsClosed] = useState<boolean>(!field.value);

    const parseTimeString = (timeStr: string) => {
        if (!timeStr) return undefined;
        const [hours, minutes] = timeStr.split("h").map((num) => parseInt(num));
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const getInitialTimes = () => {
        if (!field.value)
            return {
                open: new Date(new Date().setHours(9, 0, 0, 0)),
                close: new Date(new Date().setHours(18, 0, 0, 0)),
            };

        const [openTimeStr, closeTimeStr] = field.value.split("-");
        return {
            open: parseTimeString(openTimeStr),
            close: parseTimeString(closeTimeStr),
        };
    };

    const initialTimes = getInitialTimes();

    const [openTime, setOpenTime] = useState<Date | undefined>(
        initialTimes.open
    );
    const [closeTime, setCloseTime] = useState<Date | undefined>(
        initialTimes.close
    );

    const formatTime = (date: Date | undefined) => {
        if (!date) return "";
        return `${date.getHours().toString().padStart(2, "0")}h${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
    };

    const handleTimeChange = (
        newOpenTime: Date | undefined,
        newCloseTime: Date | undefined
    ) => {
        setOpenTime(newOpenTime);
        setCloseTime(newCloseTime);
        field.onChange(
            `${formatTime(newOpenTime)}-${formatTime(newCloseTime)}`
        );
    };

    const handleClosedChange = (checked: boolean) => {
        setIsClosed(checked);
        if (checked) {
            field.onChange("");
        } else {
            handleTimeChange(openTime, closeTime);
        }
    };

    return (
        <FormItem className="space-y-2">
            <FormLabel className="text-base font-medium text-gray-700">
                {day}
            </FormLabel>
            <div className="flex items-center bg-white w-full p-3 rounded-lg border border-gray-200 shadow-sm hover:border-gray-300 transition-colors">
                <FormControl>
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2">
                        <TimePicker
                            date={openTime}
                            setDate={(date) =>
                                handleTimeChange(date, closeTime)
                            }
                            disabled={isClosed}
                        />
                        <span className="text-foreground">à</span>
                        <TimePicker
                            date={closeTime}
                            setDate={(date) => handleTimeChange(openTime, date)}
                            disabled={isClosed}
                        />
                    </div>
                </FormControl>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`closed-${name}`}
                    checked={isClosed}
                    onCheckedChange={handleClosedChange}
                />
                <label
                    htmlFor={`closed-${name}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Fermé ce jour
                </label>
            </div>
            <FormMessage className="text-sm" />
        </FormItem>
    );
};

export default ScheduleTimePicker;
