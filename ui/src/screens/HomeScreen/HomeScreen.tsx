import { Grid } from "@mui/material"
import BoxSearch from "./components/SearchCard"

function HomeScreen() {
	return (
		<Grid container>
			<Grid item xs={6}>
				<BoxSearch />
			</Grid>
		</Grid>
	)
}

export default HomeScreen
