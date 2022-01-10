import Layout from "components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "screens/HomeScreen"
import SplashScreen from "./screens/SplashScreen"
import { HOME } from "./urls"

function Router() {
	return (
		<BrowserRouter>
			<SplashScreen>
				<Layout>
					<Routes>
						<Route path={HOME} element={<HomeScreen />} />
						<Route path="*" element={<p>Nic tu nie ma 🤔</p>} />
					</Routes>
				</Layout>
			</SplashScreen>
		</BrowserRouter>
	)
}

export default Router
