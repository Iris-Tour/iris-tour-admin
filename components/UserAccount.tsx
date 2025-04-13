import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";

interface UserAccountProps {
    user: UserData;
}

const UserAccount: FC<UserAccountProps> = ({ user }) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
                <AvatarFallback>{`${user.firstname
                    .charAt(0)
                    .toUpperCase()} ${user.lastname
                    .charAt(0)
                    .toUpperCase()}`}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="font-bold text-[18px] leading-5">
                    {`${user.firstname} ${user.lastname}`}
                </span>
                <span className="text-sm text-gray-500">
                    {user.email}
                </span>
            </div>
        </div>
    );
};

export default UserAccount;
