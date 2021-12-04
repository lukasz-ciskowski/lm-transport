import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	const Fine = Type.Object({
		id: Type.Integer(),
		date: Type.String({ format: "date-time" }),
		is_paid: Type.Boolean(),
	})
    export const Fines = Type.Array(Fine)
}

export type FinesSchema = Static<typeof Schemas.Fines>
