import { useQuery } from "react-query"
import * as S from "./styles"
import { getBusLines, getDiscounts, getTicketTypes, refresh } from "./api"
import { BusLinesResult } from "./types"
import { AxiosError } from "axios"
import { useAuthDispatcher } from "contexts/AuthContext/hooks"
import { useGlobalDispatch } from "contexts/GlobalContext/hooks"
import { Alert } from "@mui/material"
import { User } from "models/user"
import { useEffect } from "react"

interface Props {
	children: React.ReactNode
}

function SplashScreen({ children }: Props) {
	const auth = useAuthDispatcher()
	const globalState = useGlobalDispatch()

	const { isLoading: authLoading } = useQuery("refresh", refresh, {
		onSuccess: (response: User) => {
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
	const {
		isLoading: busLinesLoading,
		isError: busLineError,
		data: busLines,
	} = useQuery("bus-lines", getBusLines)
	const {
		isLoading: discountsLoading,
		isError: discountError,
		data: discounts,
	} = useQuery("discounts", getDiscounts)
	const {
		isLoading: ticketTypesLoading,
		isError: ticketTypeError,
		data: ticketTypes,
	} = useQuery("ticket-types", getTicketTypes)

	const isLoading = busLinesLoading || discountsLoading || ticketTypesLoading
	const isError = busLineError || discountError || ticketTypeError

	useEffect(() => {
		if (ticketTypes && busLines && discounts)
			globalState.loadAll({
				busLines: busLines.bus_lines,
				discounts: discounts.discounts,
				ticketTypes: ticketTypes.ticket_types,
			})
	}, [busLines, discounts, globalState, ticketTypes])

	if (isError) return <Alert severity="error">Nie można wyświetlić zawartosci strony</Alert>
	if (isLoading || authLoading) return <S.Splash />
	return <>{children}</>
}

export default SplashScreen
