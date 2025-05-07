import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import Link from "next/link";
import { getInitials, getRandomColor, getAvatarClasses } from "@/utils/avatar";

interface UserAccountProps {
    user: AdminType | UserType;
}

const UserAccount: FC<UserAccountProps> = ({ user }) => {
    const fullName = `${user.firstname} ${user.lastname}`;
    const initials = getInitials(fullName);
    const avatarColor = getRandomColor(fullName);
    const avatarClasses = getAvatarClasses({ name: fullName, size: "md" });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                    <Avatar className={avatarClasses}>
                        <AvatarFallback
                            className="bg-transparent"
                            style={{ backgroundColor: avatarColor }}
                        >
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-bold text-[18px] leading-5">
                            {fullName}
                        </span>
                        <span className="text-sm text-gray-500">
                            {user.email}
                        </span>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
                <div className="flex flex-col gap-1">
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserAccount;
