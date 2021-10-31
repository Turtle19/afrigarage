export interface User{
    id: number;
    username: string;
    email: string;
    customRole: string;
    client: Client
}

export interface Client{
    firstname: string;
    lastname: string;
    phone_number: string;
    address: string;
    avatar: []
}

export interface AuthResponse{
    jwt: string;
    user: User
}