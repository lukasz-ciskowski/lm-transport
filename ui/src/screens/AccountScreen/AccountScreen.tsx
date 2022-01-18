import {
	Grid,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Typography,
} from "@mui/material"
import { useAuth } from "contexts/AuthContext/hooks"
import React from "react"
import { Link, matchPath, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { HISTORICAL_TICKETS, HOME } from "urls"
import Tickets from "./views/Tickets"
import { MENU_ITEMS } from "./menuitems"
import * as S from "./styles"
import HistoricalTickets from "./views/HistoricalTickets"

function AccountScreen() {
	const auth = useAuth()
	const path = useLocation()

	if (auth.state === "unauthorized") return <Navigate to={HOME} />
	return (
		<Grid container justifyContent="space-between">
			<Grid container item xs={3} flexDirection="column">
				<S.Title>
					<Typography variant="h5">Witaj, {auth.data.firstName}</Typography>
				</S.Title>
				<Paper style={{ width: "100%", height: "fit-content" }}>
					<S.MenuWrapper>
						<MenuList>
							{MENU_ITEMS.map((item) => (
								<Link to={item.url}>
									<MenuItem
										className={
											matchPath(path.pathname, item.url)
												? "active"
												: "inactive"
										}
									>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText>{item.text}</ListItemText>
									</MenuItem>
								</Link>
							))}
						</MenuList>
					</S.MenuWrapper>
				</Paper>
			</Grid>
			<Grid container item xs={8}>
				<Routes>
					<Route index element={<Tickets />} />
					<Route path={HISTORICAL_TICKETS} element={<HistoricalTickets />} />
				</Routes>
			</Grid>
		</Grid>
	)
}

export default AccountScreen
