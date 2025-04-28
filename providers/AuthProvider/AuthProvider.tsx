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
    const [isClient, setIsClient] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const [isPending, setTransition] = useTransition();

    const nonAuthPathnames = [
        "/reset-password",
        "/reset-password/change-password",
    ];

    // Safely access localStorage after hydration
    useEffect(() => {
        setIsClient(true);
        const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");
        if (storedToken.token) {
            setToken(storedToken.token);
        }
    }, []);

    const {
        data: user,
        isLoading,
        isError,
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
        if (!isClient) return;

        const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");
        const isNonAuthPath = nonAuthPathnames.some((path) =>
            pathname.startsWith(path)
        );

        if (!isNonAuthPath) {
            if (isError && pathname !== "/login") {
                redirectTo("/login");
            } else {
                if (storedToken.token) {
                    if (user && pathname === "/login") {
                        redirectTo("/dashboard");
                    }
                } else if (pathname !== "/login") {
                    redirectTo("/login");
                }
            }
        }
    }, [user, router, pathname, isError, isClient]);

    const login = (userData: AdminType | UserType, tokenData: TokenData) => {
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
