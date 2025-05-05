"use client";

import { useId, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export default function SelectWithSearch({
    value,
    onValueChange,
    options,
    placeholder = "Rechercher...",
    noResultsText = "Aucun résultat trouvé.",
}: {
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    noResultsText?: string;
}) {
    const id = useId();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="*:not-first:mt-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="font-normal text-base bg-white hover:bg-white border-input w-full justify-between px-5 py-6 outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                        <span
                            className={cn(
                                "truncate pl-2",
                                !value && "text-muted-foreground"
                            )}
                        >
                            {value
                                ? options.find(
                                      (option) => option.value === value
                                  )?.label
                                : placeholder}
                        </span>
                        <ChevronDownIcon
                            size={16}
                            className="text-muted-foreground/80 shrink-0"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                    align="start"
                >
                    <Command>
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty>{noResultsText}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={(currentValue) => {
                                            const selectedOption = options.find(
                                                (opt) =>
                                                    opt.label === currentValue
                                            );
                                            const newValue =
                                                selectedOption?.value === value
                                                    ? undefined
                                                    : selectedOption?.value ||
                                                      undefined;
                                            onValueChange(newValue ?? "");
                                            setOpen(false);
                                        }}
                                        className="text-base"
                                    >
                                        {option.label}
                                        {value === option.value && (
                                            <CheckIcon
                                                size={16}
                                                className="ml-auto"
                                            />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
