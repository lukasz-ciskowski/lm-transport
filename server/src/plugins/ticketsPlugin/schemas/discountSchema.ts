import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const Discount = Type.Object({
		id: Type.Number(),
		name: Type.String(),
		percentage: Type.Number(),
	})
}

export type DiscountSchema = Static<typeof Schemas.Discount>
