import React from "react"
import { useQuery } from "react-query"
import { Route, Routes, useParams } from "react-router-dom"
import { BUS_STOP, ROUTE_RUN } from "urls"
import { TimetableBaseProps } from "../../types"
import { getSingleBusStop } from "./api"
import BusStopView from "./views/BusStopView"
import RouteRunView from "./views/RouteRunView"

type Props = TimetableBaseProps

type Params = { bus_line: string; bus_stop: string }

function BusStopContainer({ initializing, schemas }: Props) {
	const { bus_stop } = useParams<Params>()
	const { data, isLoading } = useQuery("bus-stop", getSingleBusStop(Number(bus_stop)))

	return (
		<Routes>
			<Route
				index
				element={
					<BusStopView
						initializing={isLoading || initializing}
						schemas={schemas}
						busStop={data}
					/>
				}
			/>
			<Route
				path={ROUTE_RUN}
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
