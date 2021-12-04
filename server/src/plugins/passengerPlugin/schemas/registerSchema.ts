import { Static, Type } from "@sinclair/typebox"
import { SharedSchemas } from "./shared"

export module Schemas {
	export const RegisterUser = Type.Object({
		login: SharedSchemas.Login,
		password: SharedSchemas.Password,
		first_name: SharedSchemas.FirstName,
		last_name: SharedSchemas.LastName,
		card_number: SharedSchemas.CardNumber,
	})
}

export type RegisterSchema = Static<typeof Schemas.RegisterUser>
