import { BusLine } from "../../busLinesPlugin/models/BusLine"
import { RunDecoration } from "./RunDecoration"
import { Schedule } from "./Schedule"

export interface RouteRun {
	Id: number
	Schedule: Schedule
	BusLine: BusLine
	Direction: DirectionKeys
	RunDecoration?: RunDecoration
}

export enum DirectionKeys {
	"Forwards",
	"Backwards",
}

export interface RouteRunDecoration {
	Id: number
	RunDecoration?: RunDecoration
}