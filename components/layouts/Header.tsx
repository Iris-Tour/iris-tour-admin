"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data/sidebarItems";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
    const [title, setTitle] = useState("");
    const pathname = usePathname();

    // Titre de l'entête
    useEffect(() => {
        sidebarItems.forEach(
            (item) => pathname == item.url && setTitle(item.title)
        );
    }, [pathname]);

    return (
        <header className="sticky top-0 bg-white w-full h-fit py-4 px-8 shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="hidden sm:block text-xl font-bold">{title}</h1>
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback>IT</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold text-[18px] leading-5">
                            Florent KOMBATE
                        </span>
                        <span className="text-sm text-gray-500">
                            FlorentKom@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
