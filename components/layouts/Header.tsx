"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data/sidebarItems";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserSkeleton from "../skeletons/Header/UserSkeleton";

const Header = () => {
    const [title, setTitle] = useState("");
    const pathname = usePathname();

    const { user } = useAuth();

    // Titre de l'entête
    useEffect(() => {
        sidebarItems.forEach(
            (item) => pathname == item.url && setTitle(item.title)
        );
    }, [pathname]);

    return (
        <header className="sticky top-0 bg-white w-full h-fit py-4 px-8 shadow-md z-40">
            <div className="flex justify-between items-center">
                <div className="min-[768px]:hidden">
                    <SidebarTrigger />
                </div>
                <h1 className="hidden sm:block text-xl font-bold">{title}</h1>
                {!user ? (
                    <UserSkeleton />
                ) : (
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>{`${user?.user.firstname
                                .charAt(0)
                                .toUpperCase()} ${user?.user.lastname
                                .charAt(0)
                                .toUpperCase()}`}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <span className="font-bold text-[18px] leading-5">
                                {`${user?.user.firstname} ${user?.user.lastname}`}
                            </span>
                            <span className="text-sm text-gray-500">
                                {user?.user.email}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
