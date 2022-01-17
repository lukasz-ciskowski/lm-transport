import { Grid } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { TIMETABLE } from "urls"
import BusLinesCard from "./views/BusLinesCard"
import BoxSearch from "./views/SearchCard"
import TimetableView from "./views/TimetableView"

function HomeScreen() {
	return (
		<Grid container gap={12}>
			<Grid item container justifyContent="space-between">
				<Grid item xs={6}>
					<BoxSearch />
				</Grid>
				<Grid item xs={5}>
					<BusLinesCard />
				</Grid>
			</Grid>
			<Grid item container xs={12}>
				<Routes>
					<Route path={`${TIMETABLE}/*`} element={<TimetableView />} />
				</Routes>
			</Grid>
		</Grid>
	)
}

export default HomeScreen
