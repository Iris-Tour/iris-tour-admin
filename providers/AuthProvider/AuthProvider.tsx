"use client";

import { FC, ReactNode, useEffect, useState, useTransition } from "react";
import { AuthContext } from "./AuthContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { currentUser } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/loading";

interface AuthProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    const pathname = usePathname();

    const router = useRouter();

    const [isPending, setTransition] = useTransition();

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

    const redirectTo = (url: string) => {
        setTransition(() => router.push(url));
    };

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");

        const isNonAuthPath = nonAuthPathnames.some((path) =>
            pathname.startsWith(path)
        );

        // Remove all paths that don't need auth
        if (!isNonAuthPath) {
            if (isError) {
                redirectTo("/login");
            } else {
                if (storedToken.token) {
                    // Check if the user is logged in at the backend side.
                    if (user && pathname === "/login") {
                        redirectTo("/dashboard");
                    }
                } else if (pathname !== "/login") {
                    redirectTo("/login");
                }
            }
        }
    }, [user, router, pathname, isError]);

    const login = (userData: UserData, tokenData: TokenData) => {
        localStorage.setItem("token", JSON.stringify(tokenData));
        setToken(tokenData.token);
        queryClient.setQueryData(["current-user"], userData);
        redirectTo("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(undefined);
        queryClient.removeQueries({ queryKey: ["current-user"] });
        redirectTo("/login");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {isPending || isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
