import { Garage } from "./garageEntity";
import { Service } from "./serviceEntity";
import { Slotime } from "./slotimesEntity";
import { User } from "./userEntity";

export interface Booking{
    id: number,
    status: string,
    immatriculation: string,
    service_garage: Service,
    garage: Garage,
    user: User,
    slotime: Slotime,

}