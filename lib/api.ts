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

// Get all admins with their roles
export const apiGetAllAdminsWithRoles = (
    token: string
): Promise<GetAllAdminsWithRolesPromise> =>
    sessionApi(API_PREFIX, "/acl/admins/roles", "GET", undefined, token);

// Create Admin
export const apiStoreAdmin = (
    token: string,
    data: StoreAdminMutation
): Promise<StoreAdminPromise> =>
    sessionApi(API_PREFIX, "/admins/create-admin", "POST", data, token);

// Update Admin
export const apiUpdateAdmin = (
    token: string,
    adminId: string,
    data: UpdateAdminMutation
): Promise<UpdateAdminPromise> =>
    sessionApi(API_PREFIX, `/admins/${adminId}`, "PUT", data, token);

// Suspend Admin
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

// Delete Admin
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

export const apiGetTourById = (
    token: string,
    tourId: string
): Promise<TourType> =>
    sessionApi(API_PREFIX, `/tours/${tourId}`, "GET", undefined, token);

// Create a tour
export const apiStoreTour = (
    token: string,
    data: StoreTourMutation
): Promise<StoreTourPromise> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("difficulty", data.difficulty.toString());
    formData.append("totalDistance", data.totalDistance.toString());
    formData.append("excursionPrice", data.excursionPrice.toString());
    formData.append("departurePoint", data.departurePoint);
    formData.append("arrivalPoint", data.arrivalPoint);
    formData.append("departureDateTime", data.departureDateTime);
    formData.append("arrivalDateTime", data.arrivalDateTime);
    formData.append("maxParticipants", data.maxParticipants.toString());
    formData.append("requiredEquipment", data.requiredEquipment);
    formData.append("staffId", data.staffId.toString());
    formData.append("status", data.status.toString());

    data.mainImages?.forEach((file) => {
        formData.append("mainImages", file);
    });

    return sessionApi(API_PREFIX, "/tours", "POST", formData, token);
};

// Update a tour
export const apiUpdateTour = (
    token: string,
    tourId: string,
    data: UpdateTourMutation
): Promise<UpdateTourPromise> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("difficulty", data.difficulty.toString());
    formData.append("totalDistance", data.totalDistance.toString());
    formData.append("excursionPrice", data.excursionPrice.toString());
    formData.append("departurePoint", data.departurePoint);
    formData.append("arrivalPoint", data.arrivalPoint);
    formData.append("departureDateTime", data.departureDateTime);
    formData.append("arrivalDateTime", data.arrivalDateTime);
    formData.append("maxParticipants", data.maxParticipants.toString());
    formData.append("requiredEquipment", data.requiredEquipment);
    formData.append("staffId", data.staffId.toString());
    formData.append("status", data.status.toString());

    data.mainImages?.forEach((file) => {
        formData.append("mainImages", file);
    });

    return sessionApi(API_PREFIX, `/tours/${tourId}`, "PUT", formData, token);
};

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

// Get an event by id
export const apiGetEventById = (
    token: string,
    eventId: string
): Promise<EventType> =>
    sessionApi(API_PREFIX, `/events/${eventId}`, "GET", undefined, token);

// Create an event
export const apiStoreEvent = (
    token: string,
    data: StoreEventMutation
): Promise<StoreEventPromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("startDateTime", data.startDateTime);
    formData.append("endDateTime", data.endDateTime);
    formData.append("location", data.location);
    formData.append("category", data.category || "");
    formData.append("staffId", data.staffId.toString());
    formData.append("ticketPrice", data.ticketPrice.toString());
    formData.append("maximumCapacity", data.maximumCapacity.toString());
    formData.append("targetAudience", data.targetAudience || "");
    formData.append(
        "accessibilityForDisabled",
        (data.accessibilityForDisabled ?? false).toString()
    );
    formData.append("program", data.program || "");
    formData.append("eventStatus", data.eventStatus.toString());

    // Ajouter les langues
    if (data.languages) {
        data.languages.forEach((lang, index) => {
            formData.append(`languages[${index}]`, lang);
        });
    }

    // Ajouter les images
    data.promotionalImage.forEach((file: File) => {
        formData.append("promotionalImage", file);
    });

    return sessionApi(API_PREFIX, "/events", "POST", formData, token);
};

// Update an event
export const apiUpdateEvent = (
    token: string,
    eventId: string,
    data: UpdateEventMutation
): Promise<UpdateEventPromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("startDateTime", data.startDateTime);
    formData.append("endDateTime", data.endDateTime);
    formData.append("location", data.location);
    formData.append("category", data.category || "");
    formData.append("staffId", data.staffId.toString());
    formData.append("ticketPrice", data.ticketPrice.toString());
    formData.append("maximumCapacity", data.maximumCapacity.toString());
    formData.append("targetAudience", data.targetAudience || "");
    formData.append(
        "accessibilityForDisabled",
        (data.accessibilityForDisabled ?? false).toString()
    );
    formData.append("program", data.program || "");
    formData.append("eventStatus", data.eventStatus.toString());

    if (data.languages) {
        data.languages.forEach((lang, index) => {
            formData.append(`languages[${index}]`, lang);
        });
    }

    data.promotionalImage.forEach((file: File) => {
        formData.append("promotionalImage", file);
    });

    return sessionApi(API_PREFIX, `/events/${eventId}`, "PUT", formData, token);
};

// Delete an event
export const apiDeleteEvent = (
    token: string,
    eventId: string
): Promise<DeleteEventPromise> =>
    sessionApi(API_PREFIX, `/events/${eventId}`, "DELETE", undefined, token);
//------------- END EVENTS

//------------- TOURISTIC SITES
// Get all touristic sites
export const apiGetAllTouristicSites = (
    token: string
): Promise<GetAllTouristicSitesPromise> =>
    sessionApi(API_PREFIX, "/touristic-sites", "GET", undefined, token);

export const apiGetTouristicSiteById = (
    token: string,
    siteId: string
): Promise<TouristicSiteType> =>
    sessionApi(
        API_PREFIX,
        `/touristic-sites/${siteId}`,
        "GET",
        undefined,
        token
    );

// Create a touristic site
export const apiStoreTouristicSite = (
    token: string,
    data: StoreTouristicSiteMutation
): Promise<StoreTouristicSitePromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("category", data.category);
    formData.append("schedule", JSON.stringify(data.schedule));
    formData.append("entranceFee", data.entranceFee);
    formData.append(
        "accessibilityForDisabled",
        data.accessibilityForDisabled.toString()
    );
    formData.append("averageRating", data.averageRating.toString());
    formData.append("legalStatus", data.legalStatus);
    formData.append("staffId", data.staffId.toString());

    data.mainImages?.forEach((file) => {
        formData.append("mainImages", file);
    });

    return sessionApi(API_PREFIX, "/touristic-sites", "POST", formData, token);
};

// Update a touristic site
export const apiUpdateTouristicSite = (
    token: string,
    siteId: string,
    data: UpdateTouristicSiteMutation
): Promise<UpdateTouristicSitePromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("category", data.category);
    formData.append("schedule", JSON.stringify(data.schedule));
    formData.append("entranceFee", data.entranceFee);
    formData.append(
        "accessibilityForDisabled",
        data.accessibilityForDisabled.toString()
    );
    formData.append("averageRating", data.averageRating.toString());
    formData.append("legalStatus", data.legalStatus);
    formData.append("staffId", data.staffId.toString());

    data.mainImages?.forEach((file) => {
        formData.append("mainImages", file);
    });

    return sessionApi(
        API_PREFIX,
        `/touristic-sites/${siteId}`,
        "PUT",
        formData,
        token
    );
};

// Delete a touristic site
export const apiDeleteTouristicSite = (
    token: string,
    siteId: string
): Promise<DeleteTouristicSitePromise> =>
    sessionApi(
        API_PREFIX,
        `/touristic-sites/${siteId}`,
        "DELETE",
        undefined,
        token
    );
//------------- END TOURISTIC SITES

//------------- HOTELS
// Get all hotels
export const apiGetAllHotels = (token: string): Promise<GetAllHotelsPromise> =>
    sessionApi(API_PREFIX, "/hotels", "GET", undefined, token);

// Get a hotel by id
export const apiGetHotelById = (
    token: string,
    hotelId: string
): Promise<HotelType> =>
    sessionApi(API_PREFIX, `/hotels/${hotelId}`, "GET", undefined, token);

// Create a hotel
export const apiStoreHotel = (
    token: string,
    data: StoreHotelMutation
): Promise<StoreHotelPromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append(
        "accessibilityForDisabled",
        data.accessibilityForDisabled.toString()
    );
    formData.append("contact", data.contact);

    data.hotelImages.forEach((file) => {
        formData.append("hotelImages", file);
    });

    return sessionApi(API_PREFIX, "/hotels", "POST", formData, token);
};

// Update a hotel
export const apiUpdateHotel = (
    token: string,
    hotelId: string,
    data: UpdateHotelMutation
): Promise<UpdateHotelPromise> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append(
        "accessibilityForDisabled",
        data.accessibilityForDisabled.toString()
    );
    formData.append("contact", data.contact);

    data.hotelImages.forEach((file) => {
        formData.append("hotelImages", file);
    });

    return sessionApi(API_PREFIX, `/hotels/${hotelId}`, "PUT", formData, token);
};

// Delete a hotel
export const apiDeleteHotel = (
    token: string,
    hotelId: string
): Promise<DeleteHotelPromise> =>
    sessionApi(API_PREFIX, `/hotels/${hotelId}`, "DELETE", undefined, token);

//------------- END HOTELS

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

// Block & unblock user
export const apiSuspendUser = (
    token: string,
    userId: string
): Promise<SuspendUserPromise> =>
    sessionApi(API_PREFIX, `/users/block/${userId}`, "POST", undefined, token);

// Delete user
export const apiDeleteUser = (
    token: string,
    userId: string
): Promise<DeleteUserPromise> =>
    sessionApi(
        API_PREFIX,
        `/users/delete/${userId}`,
        "DELETE",
        undefined,
        token
    );

// Verify user email
export const apiVerifyUserEmail = (
    token: string
): Promise<VerifyUserEmailPromise> =>
    api(API_PREFIX, `/auth/verify-email?token=${token}`, "POST", undefined);

// Resend email verification
export const apiResendEmailVerification = (
    data: ResendEmailVerificationMutation
): Promise<ResendEmailVerificationPromise> =>
    api(API_PREFIX, `/auth/resend-email`, "POST", data);
//------------- END USERS

//------------- STAFF
// Get all staff
export const apiGetAllStaff = (token: string): Promise<GetAllStaffPromise> =>
    sessionApi(API_PREFIX, "/staffs", "GET", undefined, token);

// Create a staff member
export const apiStoreStaff = (
    token: string,
    data: StoreStaffMutation
): Promise<StoreStaffPromise> => {
    const formData = new FormData();

    // Ajouter les champs texte
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("type", data.type.toString());
    formData.append("dialCode", data.dialCode);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("address", data.address);

    // Ajouter les langues
    data.languages.forEach((lang, index) => {
        formData.append(`languages[${index}]`, lang);
    });

    // Ajouter les fichiers
    data.image_path.forEach((file, index) => {
        formData.append(`image_path[${index}]`, file);
    });

    return sessionApi(API_PREFIX, "/staffs", "POST", formData, token);
};

// Update a staff member
export const apiUpdateStaff = (
    token: string,
    staffId: string,
    data: UpdateStaffMutation
): Promise<UpdateStaffPromise> => {
    const formData = new FormData();

    // Ajouter les champs texte
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("type", data.type.toString());
    formData.append("dialCode", data.dialCode);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("email", data.email);
    formData.append("address", data.address);

    // Ajouter les langues
    data.languages.forEach((lang, index) => {
        formData.append(`languages[${index}]`, lang);
    });

    // Ajouter les fichiers
    data.image_path.forEach((file, index) => {
        formData.append(`image_path[${index}]`, file);
    });

    return sessionApi(API_PREFIX, `/staffs/${staffId}`, "PUT", formData, token);
};

// Delete a staff member
export const apiDeleteStaff = (
    token: string,
    staffId: string
): Promise<DeleteStaffPromise> =>
    sessionApi(
        API_PREFIX,
        `/staffs/delete/${staffId}`,
        "DELETE",
        undefined,
        token
    );
//------------- END STAFF

//------------- LANGUAGES
// Get all languages
export const apiGetAllLanguages = (
    token: string
): Promise<GetAllLanguagesPromise> =>
    sessionApi(API_PREFIX, "/languages", "GET", undefined, token);

// Store a language
export const apiStoreLanguage = (
    token: string,
    data: StoreLanguageMutation
): Promise<StoreLanguagePromise> => {
    return sessionApi(API_PREFIX, "/languages", "POST", data, token);
};

// Update a language
export const apiUpdateLanguage = (
    token: string,
    languageId: string,
    data: UpdateLanguageMutation
): Promise<UpdateLanguagePromise> => {
    return sessionApi(
        API_PREFIX,
        `/languages/${languageId}`,
        "PUT",
        data,
        token
    );
};

// Delete a language
export const apiDeleteLanguage = (
    token: string,
    languageId: string
): Promise<void> => {
    return sessionApi(
        API_PREFIX,
        `/languages/delete/${languageId}`,
        "DELETE",
        undefined,
        token
    );
};

//------------- END LANGUAGES
