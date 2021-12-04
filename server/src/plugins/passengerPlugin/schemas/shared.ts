import { Static, Type } from "@sinclair/typebox"

export module SharedSchemas {
	export const Login = Type.String({ minLength: 3, maxLength: 100 })
	export const Password = Type.String({ minLength: 6, maxLength: 100 })
	export const FirstName = Type.String({ minLength: 1, maxLength: 100 })
	export const LastName = Type.String({ minLength: 1, maxLength: 100 })
	export const CardNumber = Type.String({ minLength: 1, maxLength: 100 })
}
