"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Button3 from "../buttons/Button3";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DatePicker {
    date?: string;
    onSelect: (selectedDate: Date | undefined) => void;
    placeholder?: string;
}

const DatePicker: FC<DatePicker> = ({ date = "", onSelect, placeholder }) => {
    const { t } = useTranslation();
    return (
        <Popover>
            <PopoverTrigger className="text-[clamp(14px,_2vw,_16px)] bg-white w-full py-6" asChild>
                <Button3
                    type="button"
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="ml-2 mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "dd MMMM yyyy", {
                            locale: fr,
                        })
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button3>
            </PopoverTrigger>
            <PopoverContent
                side="right"
                align="center"
                sideOffset={8}
                avoidCollisions={true}
                asChild={false}
                className="flex flex-col items-center text-[clamp(14px,_2vw,_16px)] w-fit"
            >
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={new Date().getFullYear()}
                    toYear={new Date().getFullYear() + 5}
                    defaultMonth={date ? new Date(date) : new Date()}
                    selected={new Date(date)}
                    onSelect={onSelect}
                    disabled={(date) =>
                        date <=
                        new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                    locale={fr}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
