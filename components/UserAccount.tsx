import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
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
        <div className="flex items-center gap-3 p-2 rounded-lg transition-colors">
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
                <span className="text-sm text-gray-500">{user.email}</span>
            </div>
        </div>
    );
};

export default UserAccount;
