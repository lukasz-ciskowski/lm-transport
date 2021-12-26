import { RunDecoration } from "./RunDecoration"
import { Schedule } from "./Schedule"

export interface RouteRun {
	Id: number
	Schedule: Schedule
	RunDecoration?: RunDecoration
}

export interface RouteRunDecoration {
	Id: number
	RunDecoration?: RunDecoration
}