import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { getServerUrl } from "@/lib/utils";
import { getInitials, getRandomColor } from "@/utils/avatar";

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
                        alt={`${user.firstname} ${user.lastname}`}
                    />
                ) : (
                    <AvatarFallback
                        style={{
                            backgroundColor: getRandomColor(
                                `${user.firstname} ${user.lastname}`
                            ),
                        }}
                    >
                        {getInitials(`${user.firstname} ${user.lastname}`)}
                    </AvatarFallback>
                )}
            </Avatar>

            <div className="flex flex-col">
                <span className="font-bold text-[18px] leading-5">
                    {`${user.firstname} ${user.lastname}`}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
            </div>
        </div>
    );
};

export default StaffAccount;
