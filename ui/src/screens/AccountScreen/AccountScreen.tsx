import { useAuth } from "contexts/AuthContext/hooks"
import React from "react"
import { Navigate } from "react-router-dom"
import { HOME } from "urls"

function AccountScreen() {
	const auth = useAuth()
    
	if (auth.state === "unauthorized") return <Navigate to={HOME} />
	return <div>Test</div>
}

export default AccountScreen
