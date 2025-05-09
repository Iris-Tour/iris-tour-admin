"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data/sidebarItems";

import useAuth from "@/hooks/useAuth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserSkeleton from "@/components/skeletons/Header/UserSkeleton";
import UserAccount from "@/components/UserAccount";
import { otherPagesLinks } from "@/data/otherPagesLinks";

const Header = () => {
    const [title, setTitle] = useState<ReactNode>("");
    const pathname = usePathname();

    const { user } = useAuth();

    // Titre de l'entête
    useEffect(() => {
        sidebarItems.forEach(
            (item) =>
                pathname === item.url &&
                setTitle(
                    <div className="flex items-center gap-2">
                        <item.icon className="w-7 h-7 stroke-secondary" />
                        {item.title}
                    </div>
                )
        );

        otherPagesLinks.forEach(
            (item) =>
                pathname === item.url &&
                setTitle(
                    <div className="flex items-center gap-2">
                        <item.icon className="w-7 h-7 stroke-secondary" />
                        {item.title}
                    </div>
                )
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
                    <UserAccount user={user?.user}/>
                )}
            </div>
        </header>
    );
};

export default Header;
