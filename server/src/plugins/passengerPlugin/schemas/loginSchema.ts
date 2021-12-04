import { Static, Type } from "@sinclair/typebox"
import { SharedSchemas } from "./shared"

export module Schemas {
	export const LoginUser = Type.Object({
		login: SharedSchemas.Login,
		password: SharedSchemas.Password,
	})
}

export type LoginSchema = Static<typeof Schemas.LoginUser>
