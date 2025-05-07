// Staff Types
type StaffType = {
    id: number;
    firstname: string;
    lastname: string;
    type: number;
    dialCode: string;
    phoneNumber: string;
    email: string;
    imagePath: {
        id: number;
        name: string;
        size: number;
        path: string;
        type: string;
    }[];
    address: string;
    languages: {
        id: number;
        title: string;
    }[];
    createdAt: string;
    updatedAt: string;
};

type GetAllStaffPromise = StaffType[];

type StoreStaffMutation = {
    image_path: File[];
    firstname: string;
    lastname: string;
    type: number;
    dialCode: string;
    phoneNumber: string;
    email: string;
    languages: string[];
    address: string;
};

type StoreStaffPromise = {
    message: string;
    staff: StaffType;
};

type UpdateStaffMutation = {
    image_path: File[];
    firstname: string;
    lastname: string;
    type: number;
    dialCode: string;
    phoneNumber: string;
    email: string;
    languages: string[];
    address: string;
};

type UpdateStaffPromise = {
    message: string;
    staff: StaffType;
};

type DeleteStaffPromise = {
    message: string;
};
