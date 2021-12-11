import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const Driver = Type.Object({
		id: Type.Number(),
		first_name: Type.String(),
        last_name: Type.String()
	})
}

export type DriverSchema = Static<typeof Schemas.Driver>
