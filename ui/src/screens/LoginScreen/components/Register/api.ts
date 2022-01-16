import axios from "axios"
import { RegisterForm } from "./types"

export const register = async ({ confirm_password, ...form }: RegisterForm): Promise<void> => {
	return await axios.post("/api/register", form)
}
