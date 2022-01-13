import { Grid } from "@mui/material"
import BusLinesCard from "./components/BusLinesCard"
import BoxSearch from "./components/SearchCard"
import TimetableView from "./components/TimetableView"

function HomeScreen() {
	return (
		<Grid container spacing={12}>
			<Grid item container justifyContent="space-between">
				<Grid item xs={6}>
					<BoxSearch />
				</Grid>
				<Grid item xs={5}>
					<BusLinesCard />
				</Grid>
			</Grid>
			<Grid item container xs={12}>
				<TimetableView />
			</Grid>
		</Grid>
	)
}

export default HomeScreen
