export interface AuthSchema {
    auth: {
        token: string | null;
        isAuth: boolean;
    };
}
