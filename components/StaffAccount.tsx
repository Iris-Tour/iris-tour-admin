import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";

interface StaffAccountProps {
    user: StaffType;
}

const StaffAccount: FC<StaffAccountProps> = ({ user }) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
                <AvatarFallback>{`${user.name
                    .charAt(0)
                    .toUpperCase()}`}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <span className="font-bold text-[18px] leading-5">
                    {user.name}
                </span>
                <span className="text-sm text-gray-500">
                    {user.email}
                </span>
            </div>
        </div>
    );
};

export default StaffAccount;
