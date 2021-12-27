import { Static, Type } from "@sinclair/typebox"

export module Schemas {
	export const RunDecorator = Type.Object({
		name: Type.String(),
        prefix: Type.String()
	})
}

export type RunDecorator = Static<typeof Schemas.RunDecorator>
