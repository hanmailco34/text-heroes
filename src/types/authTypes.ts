export interface IAuthState {
    isLoggedIn: boolean;
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

export type LoginFormData = {
    userId: string;
    password: string;
};

export type SignupFormData = {
    userId: string;
    password: string;
    email: string;
    passwordConfirm: string;
};

export type AuthFormFields = LoginFormData | SignupFormData;
