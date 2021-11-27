export interface User{
    id: number;
    username: string;
    email: string;
    customRole: string;
    firstname: string;
    lastname: string;
    password: string;
    description: string;
    phoneNumber: string;
    address: string;
    avatar: [];
    urlPhoto: string;
}
export interface AuthResponse{
    jwt: string;
    user: User
}