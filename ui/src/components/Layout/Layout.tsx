import React from "react"
import * as S from "./styles"
import { Link } from "react-router-dom"
import { ACCOUNT, HOME, LOGIN } from "urls"
import { Button, Grid } from "@mui/material"
import { useAuth, useAuthDispatcher } from "contexts/AuthContext/hooks"
import { AccountCircle, ExitToApp } from "@mui/icons-material"
import { useMutation } from "react-query"
import { logout } from "./api"

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	const auth = useAuth()
	const authDispatch = useAuthDispatcher()
	const { mutate } = useMutation(logout)

	const handleLogOut = () => {
		authDispatch.logOut()
		mutate()
	}

	return (
		<>
			<S.Head>
				<S.HeadContent>
					<Grid container justifyContent="space-between">
						<Grid container item xs="auto">
							<Link to={HOME}>
								<S.LogoContent>
									<img src="/images/logo-nav.png" alt="logo" />
									<S.NavSubtitle>
										Zarząd transportu miejskiego w Gdańsku
									</S.NavSubtitle>
								</S.LogoContent>
							</Link>
						</Grid>
						<Grid container item xs="auto">
							{auth.state === "unauthorized" && (
								<Link to={LOGIN}>
									<Button variant="contained">Zaloguj</Button>
								</Link>
							)}
							{auth.state === "logged" && (
								<Grid container item columnGap={4}>
									<Link to={ACCOUNT}>
										<Button color="secondary" startIcon={<AccountCircle />}>
											Konto
										</Button>
									</Link>
									<Link to={HOME}>
										<Button
											color="secondary"
											startIcon={<ExitToApp />}
											onClick={handleLogOut}
										>
											Wyloguj
										</Button>
									</Link>
								</Grid>
							)}
						</Grid>
					</Grid>
				</S.HeadContent>
			</S.Head>
			<S.Content>{children}</S.Content>
		</>
	)
}

export default Layout
