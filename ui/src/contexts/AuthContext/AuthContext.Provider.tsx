import React, { useCallback, useMemo, useState } from "react"
import { AuthContextDispatch, AuthContextState, AuthState, LoggedState } from "./AuthContext"

interface Props {
	children: React.ReactNode
}

function AuthContextProvider({ children }: Props) {
	const [state, setState] = useState<AuthState>({ state: "unauthorized" })

	const handleLogIn = useCallback(
		(data: LoggedState["data"]) => setState({ state: "logged", data }),
		[]
	)

	const handleLogOut = useCallback(() => setState({ state: "unauthorized" }), [])

	const dispatcher = useMemo(
		() => ({ logIn: handleLogIn, logOut: handleLogOut }),
		[handleLogIn, handleLogOut]
	)

	return (
		<AuthContextDispatch.Provider value={dispatcher}>
			<AuthContextState.Provider value={state}>{children}</AuthContextState.Provider>
		</AuthContextDispatch.Provider>
	)
}

export default AuthContextProvider
