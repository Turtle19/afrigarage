import { Garage } from "./garageEntity";

export interface Service{
    id: number,
    name: string,
    description: string,
    garages: Garage[]
}