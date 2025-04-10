import axios from "axios";
import { getServerUrl } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const serverUrl = getServerUrl();

const API_PREFIX = "/api/v1";

export const sessionApi = async <T>(
    prefix: string = API_PREFIX,
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

export const apiLogin = (
    data: LoginMutation
): Promise<{ user: UserData; token: TokenData }> =>
    api(API_PREFIX, "/auth/login", "POST", data);

export const currentUser = (
    data: GetCurrentUser
): Promise<{ user: UserData }> =>
    sessionApi(API_PREFIX, "/auth/current-user", "GET", undefined, data.token);

export const resetPassword = (
    data: ResetPasswordMutation
): Promise<ResetPasswordPromise> =>
    api(API_PREFIX, "/auth/forgot-password", "POST", data);

export const changePassword = (
    token: string,
    data: ChangePasswordMutation
): Promise<ChangePasswordPromise> =>
    api(API_PREFIX, `/auth/reset-password?token=${token}`, "POST", data);

// Get all roles
export const apiGetAllRoles = (token: string): Promise<GetAllRolesPromise[]> =>
    sessionApi(API_PREFIX, "/acl/roles", "GET", undefined, token);

// Get all permissions
export const apiGetAllPermissions = (
    token: string
): Promise<GetAllPermissionsPromise[]> =>
    sessionApi(API_PREFIX, `/acl/permissions`, "GET", undefined, token);

// Create a new role with permissions
export const apiStoreRoleWithPermissions = (
    token: string,
    data: storeRoleWithPermissionsMutation
): Promise<storeRoleWithPermissionsPromise> =>
    sessionApi(API_PREFIX, "/acl/roles/permissions", "POST", data, token);
