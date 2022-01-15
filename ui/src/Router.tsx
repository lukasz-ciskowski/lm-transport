import Layout from "components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "screens/HomeScreen"
import SplashScreen from "./screens/SplashScreen"
import { MAIN } from "./urls"

function Router() {
	return (
		<BrowserRouter>
			<SplashScreen>
				<Layout>
					<Routes>
						<Route path={MAIN} element={<HomeScreen />} />
					</Routes>
				</Layout>
			</SplashScreen>
		</BrowserRouter>
	)
}

export default Router
