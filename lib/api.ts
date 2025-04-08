import axios from "axios";
import { getServerUrl } from "@/lib/utils";

const serverUrl = getServerUrl();

const prefix = "/api/v1";

export const sessionApi = async <T>(
    prefix: string = "",
    endpoint: string,
    method: string = "GET",
    body?: any,
    token?: string
): Promise<T> => {
    try {
        const response = await axios({
            method,
            url: `${serverUrl}${prefix}${endpoint}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: body || null,
            withCredentials: true,
        });

        return response.data;
    } catch (error: any) {
        // console.log(error);

        if (error.message.includes("Network Error")) {
            throw "networkError";
        }

        throw error.response.data;
    }
};

export const api = async <T>(
    prefix: string = "",
    endpoint: string,
    method: string = "GET",
    body?: any
): Promise<T> => {
    try {
        const response = await axios({
            method,
            url: `${serverUrl}${prefix}${endpoint}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: body || undefined,
        });

        return response.data;
    } catch (error: any) {
        // console.log(error);

        if (error.message.includes("Network Error")) {
            throw "networkError";
        }

        throw error.response.data;
    }
};

export const login = (data: LoginMutation): Promise<LoginPromise> =>
    api(prefix, "/auth/login", "POST", data);
