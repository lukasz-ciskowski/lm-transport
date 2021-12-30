import React from "react"
import * as S from "./styles"
import { Link } from "react-router-dom"
import { HOME } from "urls"

interface Props {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<>
			<S.Head>
				<S.HeadContent>
					<Link to={HOME}>
						<S.LogoContent>
							<img src="/images/logo-nav.png" alt="logo" />
							<S.NavSubtitle>Zarząd transportu miejskiego w Gdańsku</S.NavSubtitle>
						</S.LogoContent>
					</Link>
				</S.HeadContent>
			</S.Head>
			<S.Content>{children}</S.Content>
		</>
	)
}

export default Layout
