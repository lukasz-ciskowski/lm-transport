import { useContext } from "react"
import { AuthContextDispatch, AuthContextState } from "./AuthContext"

export const useAuthDispatcher = () => {
	return useContext(AuthContextDispatch)
}

export const useAuth = () => {
	return useContext(AuthContextState)
}
