import { FC } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchNormal1 } from "iconsax-react";

interface SearchInputProps extends React.ComponentProps<"input"> {
    placeholder?: string;
    className?: string;
}

const SearchInput: FC<SearchInputProps> = ({
    placeholder,
    className,
    ...props
}) => {
    return (
        <div className="relative">
            <label
                htmlFor="search-input"
                className="absolute top-1/2 left-3 -translate-y-1/2"
            >
                <SearchNormal1 className="stroke-black w-5 h-5" />
            </label>
            <Input
                id="search-input"
                placeholder={placeholder}
                className={cn("pl-10 pr-5 py-5", className)}
                {...props}
            />
        </div>
    );
};

export default SearchInput;
