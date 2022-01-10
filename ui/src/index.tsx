import React from "react"
import ReactDOM from "react-dom"
import Router from "./Router"
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "./styles/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./config/axios.config"
import Global from "./styles/global"
import AuthContextProvier from "contexts/AuthContext"
import { LocalizationProvider } from "@mui/lab"
import AdapterDate from "@mui/lab/AdapterMoment"
import "moment/locale/pl"
import moment from "moment"

moment.locale("pl")

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
})

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContextProvier>
				<LocalizationProvider libInstance={moment} dateAdapter={AdapterDate} locale="pl">
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Global />
						<ToastContainer
							position="bottom-right"
							autoClose={3000}
							hideProgressBar={true}
							newestOnTop={false}
							closeOnClick
							rtl={false}
						/>
						<Router />
					</ThemeProvider>
				</LocalizationProvider>
			</AuthContextProvier>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
