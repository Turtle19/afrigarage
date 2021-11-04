import { Garage } from "./garageEntity";
import { Service } from "./serviceEntity";
import { Slotime } from "./slotimesEntity";
import { Client } from "./userEntity";

export interface Booking{
    id: number,
    status: string,
    immatriculation: string,
    service_garage: Service,
    garage: Garage,
    Client: Client,
    slotime: Slotime,

}