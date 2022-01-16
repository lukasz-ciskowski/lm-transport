import axios from "axios"
import { RefreshResult } from "screens/SplashScreen/types"
import { LoginForm } from "./types"

export const logIn = async (form: LoginForm): Promise<RefreshResult> => {
	const result = await axios.post("/api/login", form)
	return result.data
}
