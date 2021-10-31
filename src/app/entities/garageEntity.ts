export interface Garage {
    id: number;
    name: string;
    description: string;
    email: string,
    phone_number: string,
    lat: number;
    longitude: number;
    logo: [];
    bookings: [];
    opening_hours: [];
    payments: [];
    address: string;
    slotimes: [];
    avis: Avis[]

}

export interface Avis{
    id: number;
    descriptionAvis: string;
    dateCreated: Date;
    garage: Garage;
    votes: Vote[]

}

export interface Vote{
    id: number;
    nbVote: number
}