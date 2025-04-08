// Login types
type LoginMutation = {
    email: string;
    password: string;
};

type LoginPromise = {
    message: string;
    error: {
        name: string;
        status: number;
        code: string;
        identifier: string;
    };
};
