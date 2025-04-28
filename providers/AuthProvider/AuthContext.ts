import { createContext } from "react";

interface AuthContextProps {
    user: { user: AdminType | UserType } | undefined;
    token: string | undefined;
    isAuthenticated: boolean;
    login: (userData: AdminType | UserType, tokenData: TokenData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    token: undefined,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});
