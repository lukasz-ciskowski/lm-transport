import { Static, Type } from "@sinclair/typebox"
import { Schemas as DriverSchema } from "./driverSchema"
import { Schemas as BusLineSchema } from "../../busLinesPlugin/schemas/busLineSchema"

export module Schemas {
	export const Bus = Type.Object({
		id: Type.Number(),
		plate: Type.String(),
		assigned_driver: DriverSchema.Driver,
		bus_line: BusLineSchema.BusLine,
	})
}

export type BusSchema = Static<typeof Schemas.Bus>
