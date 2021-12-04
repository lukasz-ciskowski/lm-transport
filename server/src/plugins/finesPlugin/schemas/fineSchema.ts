import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const Fine = Type.Object({
		id: Type.Integer(),
		date: Type.String({ format: "date-time" }),
		is_paid: Type.Boolean(),
		fine_price: Type.Number({ minimum: 0 }),
	})
}

export type FineSchema = Static<typeof Schemas.Fine>
