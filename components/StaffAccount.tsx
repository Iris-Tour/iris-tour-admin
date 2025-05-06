import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { getServerUrl } from "@/lib/utils";
import { getInitials, getRandomColor } from "@/lib/utils/avatar";

interface StaffAccountProps {
    user: StaffType;
}

const StaffAccount: FC<StaffAccountProps> = ({ user }) => {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
                {user.imagePath?.[0]?.path ? (
                    <AvatarImage
                        src={`${getServerUrl()}/${user.imagePath[0].path}`}
                        alt={user.name}
                    />
                ) : (
                    <AvatarFallback
                        style={{
                            backgroundColor: getRandomColor(user.name),
                        }}
                    >
                        {getInitials(user.name)}
                    </AvatarFallback>
                )}
            </Avatar>

            <div className="flex flex-col">
                <span className="font-bold text-[18px] leading-5">
                    {user.name}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
            </div>
        </div>
    );
};

export default StaffAccount;
