import { useQuery } from "react-query"
import { Route, Routes, useParams } from "react-router-dom"
import { TIMETABLE, BUS_STOP } from "urls"
import { getSchema } from "./api"
import BusLineView from "./views/BusLineView"
import BusStopContainer from "./views/BusStopContainer"
import * as S from "./styles"

type Params = { bus_line: string }

export default function TimetableView() {
	const { bus_line } = useParams<Params>()
	const { data, isLoading } = useQuery("route-schemas", getSchema(Number(bus_line)))

	return (
		<S.CardBox>
			<Routes>
				<Route index element={<BusLineView initializing={isLoading} schemas={data} />} />
				<Route
					path={`${BUS_STOP}/*`}
					element={<BusStopContainer initializing={isLoading} schemas={data} />}
				/>
			</Routes>
		</S.CardBox>
	)
}
