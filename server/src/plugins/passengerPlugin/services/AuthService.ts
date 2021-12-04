import { conflict, notFound } from "@hapi/boom"
import { AuthRepository } from "../repositories/AuthRepository"
import { RegisterSchema } from "../schemas/registerSchema"

class Service {
	async getByLogin(login: string) {
		const user = await AuthRepository.getByLogin(login)
		if (!user.passenger) throw notFound("Passenger could not be found")

		return user.passenger
	}

	async getById(id: number) {
		const user = await AuthRepository.getById(id)
		if (!user.passenger) throw notFound("Passenger could not be found")

		return user.passenger
	}

	async register(user: RegisterSchema) {
		const countLogins = await AuthRepository.countLogins(user.login)
		if (countLogins.count !== 0) throw conflict("Login already taken")

		return await AuthRepository.registerUser(user)
	}
}

export const AuthService = new Service()
