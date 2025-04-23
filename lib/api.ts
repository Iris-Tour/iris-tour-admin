import axios from "axios";
import { getServerUrl } from "@/lib/utils";

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
            data: body || undefined,
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

export const apiLogout = (token: string): Promise<any> =>
    sessionApi(API_PREFIX, "/auth/logout", "POST", {}, token);

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

// Get all admins with their roles
export const apiGetAllAdminsWithRoles = (
    token: string
): Promise<GetAllAdminsWithRolesPromise> =>
    sessionApi(API_PREFIX, "/acl/users/roles", "GET", undefined, token);

// Get all roles with their permissions
export const apiGetAllRolesWithPermissions = (
    token: string
): Promise<GetAllRolesWithPermissionPromise> =>
    sessionApi(API_PREFIX, "/acl/roles/permissions", "GET", undefined, token);

// Get all permissions
export const apiGetAllPermissions = (
    token: string
): Promise<GetAllPermissionsPromise[]> =>
    sessionApi(API_PREFIX, `/acl/permissions`, "GET", undefined, token);

// Create a new role with permissions
export const apiStoreRoleWithPermissions = (
    token: string,
    data: StoreRoleWithPermissionsMutation
): Promise<StoreRoleWithPermissionsPromise> =>
    sessionApi(API_PREFIX, "/acl/roles/permissions", "POST", data, token);

// Update a role with its permissions
export const apiUpdateRoleWithPermissions = (
    token: string,
    roleId: string,
    data: UpdateRoleWithPermissionsMutation
): Promise<UpdateRoleWithPermissionsPromise> =>
    sessionApi(
        API_PREFIX,
        `/acl/roles/${roleId}/permissions`,
        "PUT",
        data,
        token
    );

// Delete a role
export const apiDeleteRole = (
    token: string,
    roleId: string
): Promise<DeleteRolePromise> =>
    sessionApi(API_PREFIX, `/acl/roles/${roleId}`, "DELETE", undefined, token);

// Get all tours
export const apiGetAllTours = (token: string): Promise<GetAllToursPromise> =>
    sessionApi(API_PREFIX, `/tours`, "GET", undefined, token);

// Create a tour
export const apiStoreTour = (
    token: string,
    data: StoreTourMutation
): Promise<StoreTourPromise> =>
    sessionApi(API_PREFIX, "/tours", "POST", data, token);

// Update a tour
export const apiUpdateTour = (
    token: string,
    tourId: string,
    data: UpdateTourMutation
): Promise<UpdateTourPromise> =>
    sessionApi(API_PREFIX, `/tours/${tourId}`, "PUT", data, token);

// Delete a tour
export const apiDeleteTour = (
    token: string,
    tourId: string
): Promise<DeleteTourPromise> =>
    sessionApi(API_PREFIX, `/tours/${tourId}`, "DELETE", undefined, token);
