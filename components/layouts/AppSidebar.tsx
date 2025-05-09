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
import useAuth from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { apiLogout } from "@/lib/api";

export function AppSidebar() {
    const { token, logout } = useAuth();
    const [activeLink, setActiveLink] = useState(-1);
    const pathname = usePathname();

    useEffect(() => {
        if (sidebarItems.some((item) => item.url === pathname)) {
            setActiveLink(
                sidebarItems.findIndex((item) => item.url === pathname)
            );
        } else {
            setActiveLink(-1);
        }
    }, [pathname]);

    const logoutMutation = useMutation({
        mutationFn: apiLogout,
        onSuccess: () => {},
        onError: () => {},
    });

    const handleLogout = () => {
        logout();
        logoutMutation.mutate(token!);
    };

    return (
        <Sidebar collapsible="icon" className="bg-primary">
            <SidebarHeader className="flex flex-col items-center gap-3">
                <div className="font-bold text-[clamp(24px,_8vw,_57px)] group-data-[collapsible=icon]:text-lg">
                    <span className="text-white">Lo</span>
                    <span className="text-secondary">go</span>
                </div>
                <SidebarTrigger className="text-white/75 bg-transparent hover:bg-transparent px-3 mr-8 group-data-[collapsible=icon]:mr-0" />
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
                                        {index === activeLink ? (
                                            <button className="cursor-pointer">
                                                <item.icon className="stroke-white" />
                                                <span>{item.title}</span>
                                            </button>
                                        ) : (
                                            <Link href={item.url}>
                                                <item.icon className="stroke-white" />
                                                <span>{item.title}</span>
                                            </Link>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-t-white/30">
                <SidebarMenuItem className="flex flex-col items-center">
                    <SidebarMenuButton
                        className={`text-base px-6 py-5 rounded-none group-data-[collapsible=icon]:rounded`}
                        asChild
                    >
                        <button
                            className="cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOutIcon />
                            <span>Déconnexion</span>
                        </button>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
}
