import axios from "axios";
import { getServerUrl } from "@/lib/utils";
import { convertToFormData } from "@/utils/convertions/convert-to-form-data";

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
        const isFormData = body instanceof FormData;

        const response = await axios({
            method,
            url: `${serverUrl}${prefix}${endpoint}`,
            headers: {
                Authorization: `Bearer ${token}`,
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
): Promise<{ user: AdminType; token: TokenData }> =>
    api(API_PREFIX, "/auth/login", "POST", data);

export const apiLogout = (token: string): Promise<any> =>
    sessionApi(API_PREFIX, "/auth/logout", "POST", {}, token);

export const currentUser = (
    data: GetCurrentUser
): Promise<{ user: AdminType }> =>
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
export const apiGetAllRoles = (token: string): Promise<GetAllRolesPromise> =>
    sessionApi(API_PREFIX, "/acl/roles", "GET", undefined, token);

// Get all roles with their permissions
export const apiGetAllRolesWithPermissions = (
    token: string
): Promise<GetAllRolesWithPermissionPromise> =>
    sessionApi(API_PREFIX, "/acl/roles/permissions", "GET", undefined, token);

// Get all permissions
export const apiGetAllPermissions = (
    token: string
): Promise<GetAllPermissionsPromise> =>
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

// Get the admins of a role
export const apiGetRoleAdmins = (
    token: string,
    roleId: string
): Promise<GetRoleAdminsPromise> =>
    sessionApi(
        API_PREFIX,
        `/acl/role/${roleId}/users`,
        "GET",
        undefined,
        token
    );

// Delete a role
export const apiDeleteRole = (
    token: string,
    roleId: string
): Promise<DeleteRolePromise> =>
    sessionApi(API_PREFIX, `/acl/roles/${roleId}`, "DELETE", undefined, token);

//-------------- ADMINS
// Create Admin
// Get all admins with their roles
export const apiGetAllAdminsWithRoles = (
    token: string
): Promise<GetAllAdminsWithRolesPromise> =>
    sessionApi(API_PREFIX, "/acl/admins/roles", "GET", undefined, token);

export const apiStoreAdmin = (
    token: string,
    data: StoreAdminMutation
): Promise<StoreAdminPromise> =>
    sessionApi(API_PREFIX, "/admins/create-admin", "POST", data, token);

export const apiUpdateAdmin = (
    token: string,
    adminId: string,
    data: UpdateAdminMutation
): Promise<UpdateAdminPromise> =>
    sessionApi(API_PREFIX, `/admins/${adminId}`, "PUT", data, token);

export const apiSuspendAdmin = (
    token: string,
    adminId: string
): Promise<SuspendAdminPromise> =>
    sessionApi(
        API_PREFIX,
        `/admins/block/${adminId}`,
        "POST",
        undefined,
        token
    );

export const apiDeleteAdmin = (
    token: string,
    adminId: string
): Promise<DeleteAdminPromise> =>
    sessionApi(
        API_PREFIX,
        `/admins/delete/${adminId}`,
        "DELETE",
        undefined,
        token
    );

//-------------- END ADMINS

//-------------- TOURS
// Get all tours
export const apiGetAllTours = (token: string): Promise<GetAllToursPromise> =>
    sessionApi(API_PREFIX, `/tours`, "GET", undefined, token);

// Create a tour
export const apiStoreTour = (
    token: string,
    data: StoreTourMutation
): Promise<StoreTourPromise> =>
    sessionApi(API_PREFIX, "/tours", "POST", convertToFormData(data), token);

// Update a tour
export const apiUpdateTour = (
    token: string,
    tourId: string,
    data: UpdateTourMutation
): Promise<UpdateTourPromise> =>
    sessionApi(
        API_PREFIX,
        `/tours/${tourId}`,
        "PUT",
        convertToFormData(data),
        token
    );

// Delete a tour
export const apiDeleteTour = (
    token: string,
    tourId: string
): Promise<DeleteTourPromise> =>
    sessionApi(API_PREFIX, `/tours/${tourId}`, "DELETE", undefined, token);
//------------- END TOURS

//------------- EVENTS
// Get all events
export const apiGetAllEvents = (token: string): Promise<GetAllEventsPromise> =>
    sessionApi(API_PREFIX, "/events", "GET", undefined, token);

// Create an event
export const apiStoreEvent = (
    token: string,
    data: StoreEventMutation
): Promise<StoreEventPromise> =>
    sessionApi(API_PREFIX, "/events", "POST", data, token);
//------------- END EVENTS

//------------- USERS
// Store a user
export const apiStoreUser = (
    token: string,
    data: StoreUserMutation
): Promise<StoreUserPromise> =>
    sessionApi(API_PREFIX, "/auth/register", "POST", data, token);

// Get all users
export const apiGetAllUsers = (token: string): Promise<GetAllUsersPromise> =>
    sessionApi(API_PREFIX, "/users", "GET", undefined, token);
//------------- END USERS
