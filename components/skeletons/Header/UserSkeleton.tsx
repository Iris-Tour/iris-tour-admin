import { Skeleton } from "@/components/ui/skeleton";

const UserSkeleton = () => {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-4 w-[60px]" />
            </div>
        </div>
    );
};

export default UserSkeleton;
