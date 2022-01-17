import Layout from "components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AccountScreen from "screens/AccountScreen"
import HomeScreen from "screens/HomeScreen"
import LoginScreen from "screens/LoginScreen"
import SplashScreen from "./screens/SplashScreen"
import { ACCOUNT, HOME, LOGIN } from "./urls"

function Router() {
	return (
		<BrowserRouter>
			<SplashScreen>
				<Layout>
					<Routes>
						<Route path={`${ACCOUNT}*`} element={<AccountScreen />} />
						<Route path={LOGIN} element={<LoginScreen />} />
						<Route path={`${HOME}*`} element={<HomeScreen />} />
					</Routes>
				</Layout>
			</SplashScreen>
		</BrowserRouter>
	)
}

export default Router
