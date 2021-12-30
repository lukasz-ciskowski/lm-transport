import { useQuery } from "react-query"
import * as S from "./styles"
import { refresh } from "./api"
import { RefreshResponse } from "./types"
import { AxiosError } from "axios"
import { useAuthDispatcher } from "contexts/AuthContext/hooks"

interface Props {
	children: React.ReactNode
}

function SplashScreen({ children }: Props) {
	const auth = useAuthDispatcher()
	
	const { isLoading } = useQuery("refresh", refresh, {
		onSuccess: (response: RefreshResponse) => {
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

	if (isLoading) return <S.Splash />
	return <>{children}</>
}

export default SplashScreen
