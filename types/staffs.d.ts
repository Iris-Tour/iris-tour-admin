// Staff Types
type StaffType = {
    id: string;
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
