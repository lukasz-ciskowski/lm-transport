import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const BusLine = Type.Object({
		id: Type.Number(),
		line_number: Type.Number(),
	})
}

export type BusLineSchema = Static<typeof Schemas.BusLine>
