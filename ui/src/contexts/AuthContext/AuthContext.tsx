import { createContext } from "react"

export interface LoggedState {
	state: "logged"
	data: {
		login: string
		firstName: string
		lastName: string
		cardNumber: string
	}
}

interface UnauthorizedState {
	state: "unauthorized"
}

export type AuthState = LoggedState | UnauthorizedState

export const AuthContextState = createContext<AuthState>({ state: "unauthorized" })

interface Dispatcher {
	logIn: (data: LoggedState["data"]) => void
	logOut: () => void
}
export const AuthContextDispatch = createContext<Dispatcher>({
	logIn: () => null,
	logOut: () => null,
})
