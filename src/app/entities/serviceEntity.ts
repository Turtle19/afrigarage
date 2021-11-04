import { Garage } from "./garageEntity";
import { Slotime } from "./slotimesEntity";

export interface Service{
    id: number,
    nameService: string,
    description: string,
    price: number,
    garage: Garage,
    slotimes: Slotime[]
}