import { createContext } from "react";

interface AuthContextProps {
    user: {user: UserData} | undefined;
    token: string | undefined;
    isAuthenticated: boolean;
    login: (userData: UserData, tokenData: TokenData) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    token: undefined,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});
