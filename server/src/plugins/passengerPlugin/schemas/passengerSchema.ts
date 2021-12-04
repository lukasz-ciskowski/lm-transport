import { Static, Type } from "@sinclair/typebox"
import { SharedSchemas } from "./shared"

export module Schemas {
	export const UserSchema = Type.Object({
		login: SharedSchemas.Login,
		first_name: SharedSchemas.FirstName,
		last_name: SharedSchemas.LastName,
		card_number: SharedSchemas.CardNumber,
	})
}

export type PassengerSchema = Static<typeof Schemas.UserSchema>
