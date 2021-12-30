import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

axios.interceptors.response.use(
	(response) => {
		return response
	},
	(error: AxiosError) => {
		if (error.response?.status === 500) {
			toast.error("Coś poszło nie tak")
		}
		if (error.response?.status === 401 && error.config.url !== "/api/refresh") {
			toast.error("Brak dostępu")
		}
		return Promise.reject(error)
	}
)
