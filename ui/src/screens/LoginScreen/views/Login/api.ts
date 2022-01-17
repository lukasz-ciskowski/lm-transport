import axios from "axios"
import { User } from "models/user"
import { LoginForm } from "./types"

export const logIn = async (form: LoginForm): Promise<User> => {
	const result = await axios.post("/api/login", form)
	return result.data
}
