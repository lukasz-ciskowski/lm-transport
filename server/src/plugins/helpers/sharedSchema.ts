import { TObject, TSchema, Type } from "@sinclair/typebox"

export module SharedSchemas {
	export const Page = Type.Number({ minimum: 1 })
	export const PageSize = Type.Number({ minimum: 1 })
	export const PageResponse = (obj: TSchema) =>
		Type.Object({
			total: Type.Number(),
			rows: obj,
		})
}
