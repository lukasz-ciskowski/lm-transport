import Layout from "components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SplashScreen from "./screens/SplashScreen"
import { HOME } from "./urls"

function Router() {
	return (
		<BrowserRouter>
			<SplashScreen>
				<Layout>
					<Routes>
						<Route path={HOME} element={<p>test</p>} />
						<Route path="*" element={<p>Nic tu nie ma 🤔</p>} />
					</Routes>
				</Layout>
			</SplashScreen>
		</BrowserRouter>
	)
}

export default Router
