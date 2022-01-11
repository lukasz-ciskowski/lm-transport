import { useQuery } from "react-query"
import * as S from "./styles"
import { getBusLines, refresh } from "./api"
import { BusLinesResult, RefreshResult } from "./types"
import { AxiosError } from "axios"
import { useAuthDispatcher } from "contexts/AuthContext/hooks"
import { useGlobalDispatch } from "contexts/GlobalContext/hooks"
import { Alert } from "@mui/material"

interface Props {
	children: React.ReactNode
}

function SplashScreen({ children }: Props) {
	const auth = useAuthDispatcher()
	const globalState = useGlobalDispatch()

	const { isLoading: authLoading } = useQuery("refresh", refresh, {
		onSuccess: (response: RefreshResult) => {
			auth.logIn({
				login: response.login,
				firstName: response.first_name,
				lastName: response.last_name,
				cardNumber: response.card_number,
			})
		},
		onError: (err: AxiosError) => {
			if (err.response?.status === 401) {
				auth.logOut()
			}
		},
	})
	const { isLoading, isError } = useQuery("bus-lines", getBusLines, {
		onSuccess: (response: BusLinesResult) => {
			globalState.loadAll({ busLines: response.bus_lines })
		},
	})

	if (isError) return <Alert severity="error">Nie można wyświetlić zawartosci strony</Alert>
	if (isLoading || authLoading) return <S.Splash />
	return <>{children}</>
}

export default SplashScreen
