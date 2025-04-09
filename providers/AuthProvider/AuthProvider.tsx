"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { currentUser } from "@/lib/api";
import { useRouter } from "next/navigation";

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

    const router = useRouter();

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

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem("token") ?? "{}");

        if (!storedToken.token) {
            router.push("/login");
        }
    }, [router]);

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

    const isAuthenticated = !!user && !!token;

    console.log(user);

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
