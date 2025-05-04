import MultipleSelector, { Option } from "@/components/ui/multiselect";
import RemovableBadge from "@/components/badges/RemovableBadge";

interface MultiselectWithPlaceholderAndClearProps {
    options: Option[];
    label?: string;
    placeholder?: string;
    emptyMessage?: string;
    className?: string;
    onChange?: (selectedOptions: Option[]) => void;
    value?: Option[];
    disabled?: boolean;
    maxSelected?: number;
    onMaxSelected?: (maxLimit: number) => void;
    hidePlaceholderWhenSelected?: boolean;
    groupBy?: string;
    badgeClassName?: string;
    creatable?: boolean;
    onSearch?: (value: string) => Promise<Option[]>;
    onSearchSync?: (value: string) => Option[];
    delay?: number;
    triggerSearchOnFocus?: boolean;
    loadingIndicator?: React.ReactNode;
}

export default function MultiselectWithPlaceholderAndClear({
    options,
    label = "Select options",
    placeholder = "Select options",
    emptyMessage = "No results found",
    className = "",
    onChange,
    value,
    disabled = false,
    maxSelected,
    onMaxSelected,
    hidePlaceholderWhenSelected,
    groupBy,
    badgeClassName,
    creatable = false,
    onSearch,
    onSearchSync,
    delay,
    triggerSearchOnFocus = false,
    loadingIndicator,
}: MultiselectWithPlaceholderAndClearProps) {
    return (
        <div className={`*:not-first:mt-2 ${className}`}>
            <MultipleSelector
                className="text-foreground text-base bg-white rounded-md"
                commandProps={{
                    label,
                }}
                defaultOptions={options}
                placeholder={placeholder}
                emptyIndicator={
                    <p className="text-center text-sm">{emptyMessage}</p>
                }
                onChange={onChange}
                value={value}
                disabled={disabled}
                maxSelected={maxSelected}
                onMaxSelected={onMaxSelected}
                hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
                groupBy={groupBy}
                badgeClassName={badgeClassName}
                creatable={creatable}
                onSearch={onSearch}
                onSearchSync={onSearchSync}
                delay={delay}
                triggerSearchOnFocus={triggerSearchOnFocus}
                loadingIndicator={loadingIndicator}
                renderBadge={(option, handleUnselect) => (
                    <RemovableBadge
                        key={option.value}
                        label={option.label}
                        onRemove={() => handleUnselect(option)}
                        className={badgeClassName}
                        disabled={disabled}
                        fixed={option.fixed}
                    />
                )}
            />
            {/* <p
                className="text-muted-foreground mt-2 text-xs"
                role="region"
                aria-live="polite"
            >
                Inspired by{" "}
                <a
                    className="hover:text-foreground underline"
                    href="https://shadcnui-expansions.typeart.cc/docs/multiple-selector"
                    target="_blank"
                    rel="noopener nofollow"
                >
                    shadcn/ui expansions
                </a>
            </p> */}
        </div>
    );
}
