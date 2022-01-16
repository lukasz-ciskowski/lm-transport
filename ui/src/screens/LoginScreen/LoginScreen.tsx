import { Card, CardContent, Tab, Tabs } from "@mui/material"
import { useAuth } from "contexts/AuthContext/hooks"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { ACCOUNT } from "urls"
import Login from "./components/Login"
import Register from "./components/Register"
import * as S from "./styles"
import { TabValues } from "./types"

function LoginScreen() {
	const auth = useAuth()
	const [tabValue, setTabValue] = useState<TabValues>(TabValues.Login)

	const handleChangeTab = (_: React.SyntheticEvent, tab: TabValues) => setTabValue(tab)

	// if (auth.state === "logged") return <Navigate to={ACCOUNT} />
	return (
		<S.Layout>
			<Card>
				<CardContent>
					<Tabs value={tabValue} onChange={handleChangeTab}>
						<Tab label="Logowanie" />
						<Tab label="Rejestracja" />
					</Tabs>
				</CardContent>
				<S.TabsContent>{tabValue === TabValues.Login && <Login />}</S.TabsContent>
				<S.TabsContent>
					{tabValue === TabValues.Register && <Register onChangeTab={setTabValue} />}
				</S.TabsContent>
			</Card>
		</S.Layout>
	)
}

export default LoginScreen
