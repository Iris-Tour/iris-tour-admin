"use client";

import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RemovableBadgeProps {
    label: string;
    onRemove: () => void;
    className?: string;
    disabled?: boolean;
    fixed?: boolean;
}

export default function RemovableBadge({
    label,
    onRemove,
    className,
    disabled,
    fixed,
}: RemovableBadgeProps) {
    return (
        <Badge
            variant="secondary"
            className={cn(
                "animate-fadeIn bg-background text-secondary-foreground hover:bg-background relative inline-flex h-7 cursor-default items-center rounded-md border ps-2 pe-7 pl-2 text-base font-medium transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2",
                className
            )}
            data-fixed={fixed}
            data-disabled={disabled || undefined}
        >
            {label}
            <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onRemove();
                    }
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onClick={onRemove}
                aria-label="Remove"
                disabled={disabled || fixed}
            >
                <XIcon size={14} aria-hidden="true" />
            </button>
        </Badge>
    );
}
