import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const TicketType = Type.Object({
		id: Type.Number(),
		name: Type.String(),
		price: Type.Number(),
		length: Type.Number(),
	})
}

export type TicketTypeSchema = Static<typeof Schemas.TicketType>
