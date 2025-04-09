"use client";

import { useEffect, useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/data/sidebarItems";
import { usePathname } from "next/navigation";

export function AppSidebar() {
    const [activeLink, setActiveLink] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        sidebarItems.forEach(
            (item, index) => item.url == pathname && setActiveLink(index)
        );
    }, [pathname]);

    return (
        <Sidebar collapsible="icon" className="bg-primary-color">
            <SidebarHeader className="flex flex-col items-center gap-3">
                <div className="font-bold text-[clamp(24px,_8vw,_57px)] group-data-[collapsible=icon]:text-lg">
                    <span className="text-white">Lo</span>
                    <span className="text-secondary-color">go</span>
                </div>
                <SidebarTrigger className="text-white/75 bg-transparent hover:bg-transparent px-3 mr-8 group-data-[collapsible=icon]:mr-0 cursor-pointer" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase px-6">
                        Menu principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="group-data-[collapsible=icon]:mt-5">
                        <SidebarMenu>
                            {sidebarItems.map((item, index) => (
                                <SidebarMenuItem
                                    className="flex flex-col items-center"
                                    key={item.title}
                                >
                                    <SidebarMenuButton
                                        className={`${
                                            index == activeLink
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : ""
                                        } text-base px-6 py-5 rounded-none group-data-[collapsible=icon]:rounded`}
                                        asChild
                                    >
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
