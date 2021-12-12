import { Bus } from "../../busPlugin/models/Bus"
import { Route } from "./Route"
import { Schedule } from "./Schedule"

export interface RouteRun {
	Id: number
	Route: Route
	Bus: Bus
	Schedule: Schedule
}

export type TimetableRouteRun = Omit<RouteRun, "Bus">
