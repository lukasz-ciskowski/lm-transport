import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const Direction = Type.Number({
		minimum: 0,
		maximum: 1,
		description: "0 - Forwards, 1 - Backwards",
	})
}

export type DirectionSchemas = Static<typeof Schemas.Direction>
