import { BusLine } from "../../busLinesPlugin/models/BusLine"
import { BusStop } from "./BusStop"

export interface Route {
	Id: number
	StartBusStop: BusStop
	EndBusStop: BusStop
	BusLine: BusLine
}
