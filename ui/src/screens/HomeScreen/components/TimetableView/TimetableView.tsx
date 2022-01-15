import { useQuery } from "react-query"
import { Route, Routes, useParams } from "react-router-dom"
import { BUS_LINE, TIMETABLE, TIMETABLE_BUS_STOP } from "urls"
import { relativePath } from "utils/relativePath"
import { getSchema } from "./api"
import BusLineView from "./components/BusLineView"
import BusStopContainer from "./components/BusStopContainer"
import * as S from "./styles"

type Params = { bus_line: string }

export default function TimetableView() {
	const { bus_line } = useParams<Params>()
	const { data, isLoading } = useQuery("route-schemas", getSchema(Number(bus_line)))

	return (
		<S.CardBox>
			<Routes>
				<Route
					path={relativePath(BUS_LINE, TIMETABLE)}
					element={<BusLineView initializing={isLoading} schemas={data} />}
				/>
				<Route
					path={relativePath(TIMETABLE_BUS_STOP, TIMETABLE)}
					element={<BusStopContainer initializing={isLoading} schemas={data} />}
				/>
			</Routes>
		</S.CardBox>
	)
}
