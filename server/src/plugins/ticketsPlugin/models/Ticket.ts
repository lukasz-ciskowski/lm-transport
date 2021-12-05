import { BusLine } from "../../busLinesPlugin/models/BusLine";
import { Passenger } from "../../passengerPlugin/models/Passenger";
import { Discount } from "./Discount";
import { TicketType } from "./TicketType";

export interface Ticket {
    Id: number
    Passenger: Passenger
    BusLine: BusLine
    StartDate: string
    EstimatedEndDate: string
    CalculatedPrice: number
    TicketType: TicketType
    Discount?: Discount
    BoughtAt: string
}

export type QueriedTicket = Omit<Ticket, "Passenger" | "Discount" | "CalculatedPrice" | "BoughtAt">