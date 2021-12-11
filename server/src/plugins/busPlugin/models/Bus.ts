import { BusLine } from "../../busLinesPlugin/models/BusLine";
import { Driver } from "./Driver";

export interface Bus {
    Id: number
	BusLine: BusLine
    AssignedDriver: Driver
    Plate: string
}
