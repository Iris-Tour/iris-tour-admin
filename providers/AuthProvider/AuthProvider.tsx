"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { currentUser } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

interface AuthProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(() => {
        return typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("token") ?? "{}").token ??
                  undefined
            : undefined;
    });

    const pathname = usePathname();

    const router = useRouter();

    const nonAuthPathnames = [
        "/reset-password",
        "/reset-password/change-password",
    ];

    const {
        data: user,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["current-user"],
        queryFn: () => currentUser({ token }),
        enabled: !!token,
        retry: false,
    });

    const isAuthenticated = !!user && !!token;

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");

        const isNonAuthPath = nonAuthPathnames.some((path) => pathname.startsWith(path));

        // Remove all paths that don't need auth
        if (!isNonAuthPath) {
            if (isError) {
                router.push("/login");
            } else {
                if (storedToken.token) {
                    // Check if the user is logged in at the backend side.
                    if (user && pathname === "/login") {
                        router.push("/dashboard");
                    }
                } else {
                    router.push("/login");
                }
            }
        }
    }, [user, router, pathname, isError]);

    const login = (userData: UserData, tokenData: TokenData) => {
        localStorage.setItem("token", JSON.stringify(tokenData));
        setToken(tokenData.token);
        queryClient.setQueryData(["current-user"], userData);
        router.push("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(undefined);
        queryClient.removeQueries({ queryKey: ["current-user"] });
        router.push("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
