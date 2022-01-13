import { Card, CardContent, CardHeader, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import * as T from "./types"
import * as S from "./styles"
import Marker from "@mui/icons-material/Room"
import Route from "@mui/icons-material/Route"
import BusStopSearch from "./components/BusStopSearch"
import { useQuery } from "react-query"
import { getBusStops } from "screens/HomeScreen/api"
import BusConnectionSearch from "./components/BusConnectionSearch"

function SearchCard() {
	const [tabValue, setTabValue] = useState(T.Tabs.ByBusStop)
	const { data: busStopsData } = useQuery("busStops", getBusStops)

	const handleChangeTab = (_: React.SyntheticEvent, tab: T.Tabs) => setTabValue(tab)

	return (
		<Card>
			<CardContent>
				<CardHeader titleTypographyProps={{ sx: { fontWeight: "500" } }} title="Znajdź" />
				<S.Content>
					<Tabs value={tabValue} onChange={handleChangeTab}>
						<Tab icon={<Marker />} iconPosition="start" label="Przystanek" />
						<Tab icon={<Route />} iconPosition="start" label="Połączenie" />
					</Tabs>
					{busStopsData && (
						<S.FormContent>
							{tabValue === T.Tabs.ByBusStop && (
								<BusStopSearch busStops={busStopsData.bus_stops} />
							)}
							{tabValue === T.Tabs.ByConnection && (
								<BusConnectionSearch busStops={busStopsData.bus_stops} />
							)}
						</S.FormContent>
					)}
				</S.Content>
			</CardContent>
		</Card>
	)
}

export default SearchCard
