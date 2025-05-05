// Staff Types
type StaffType = {
    id: string;
    imagePath: {
        id: string;
        name: string;
        size: number;
        path: string;
        type: string;
    }[];
    name: string;
    type: number;
    phone: string;
    email: string;
    languages: string[];
    address: string;
    createdAt: string;
    updatedAt: string;
};

type GetAllStaffPromise = StaffType[];

type StoreStaffMutation = {
    image_path: File[];
    name: string;
    type: number;
    phone: string;
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
    name: string;
    type: number;
    phone: string;
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
