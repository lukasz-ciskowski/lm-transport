import React from "react"
import { useQuery } from "react-query"
import { Route, Routes, useParams } from "react-router-dom"
import { BUS_STOP, ROUTE_RUN, TIMETABLE_BUS_STOP } from "urls"
import { relativePath } from "utils/relativePath"
import { TimetableBaseProps } from "../../types"
import { getSingleBusStop } from "./api"
import BusStopView from "./components/BusStopView"
import RouteRunView from "./components/RouteRunView"

type Props = TimetableBaseProps

type Params = { bus_line: string; bus_stop: string }

function BusStopContainer({ initializing, schemas }: Props) {
	const { bus_stop } = useParams<Params>()
	const { data, isLoading } = useQuery("bus-stop", getSingleBusStop(Number(bus_stop)))

	return (
		<Routes>
			<Route
				path={relativePath(BUS_STOP, TIMETABLE_BUS_STOP)}
				element={
					<BusStopView
						initializing={isLoading || initializing}
						schemas={schemas}
						busStop={data}
					/>
				}
			/>
            <Route
				path={relativePath(ROUTE_RUN, TIMETABLE_BUS_STOP)}
				element={
					<RouteRunView
						initializing={isLoading || initializing}
						schemas={schemas}
						busStop={data}
					/>
				}
			/>
		</Routes>
	)
}

export default BusStopContainer
