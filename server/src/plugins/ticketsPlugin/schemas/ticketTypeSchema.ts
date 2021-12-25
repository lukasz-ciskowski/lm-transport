import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const TicketType = Type.Object({
		id: Type.Number(),
		name: Type.String(),
		price: Type.Number(),
		static_duration: Type.Optional(Type.String()),
	})
}

export type TicketTypeSchema = Static<typeof Schemas.TicketType>
