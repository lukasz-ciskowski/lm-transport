import { BaseBusStop } from "../../timetablePlugin/models/BusStop";

export interface BusLine {
    Id: number
    LineNumber: number
}

export interface BusLineEndpoints {
    From: BaseBusStop
	To: BaseBusStop
}