import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const BusStop = Type.Object({
		id: Type.Number(),
		name: Type.String(),
		street: Type.String(),
		city: Type.String(),
		post_code: Type.String(),
		lat: Type.Number(),
		lon: Type.Number(),
	})
}

export type BusStopSchema = Static<typeof Schemas.BusStop>
