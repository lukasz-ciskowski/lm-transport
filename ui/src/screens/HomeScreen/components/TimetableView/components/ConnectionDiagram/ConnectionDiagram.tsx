import { Directions } from "common/Directions"
import qs from "qs"
import { generatePath, Link } from "react-router-dom"
import { BusStop } from "screens/HomeScreen/types"
import { BUS_STOP, TIMETABLE } from "urls"
import * as S from "./styles"

interface Props {
	route: [Directions.Forward | Directions.Backwards, Array<Pick<BusStop, "id" | "name">>]
	busLineId: string
	selectedBusStop?: number | undefined
}

function ConnectionDiagram({ route, busLineId, selectedBusStop }: Props) {
	const selectedIndex = selectedBusStop
		? route[1].findIndex((stop) => stop.id === selectedBusStop)
		: undefined
	return (
		<>
			{route[1].map((stop, index) => {
				return (
					<S.ConnectionsBox>
						<S.ConnectionImg index={index} totalSize={route[1].length} />
						<Link
							to={{
								pathname: generatePath(`${TIMETABLE}/${BUS_STOP}`, {
									bus_line: busLineId,
									bus_stop: stop.id.toString(),
								}),
								search: qs.stringify({ direction: route[0] }),
							}}
						>
							<S.ConnectionText
								index={index}
								totalSize={route[1].length}
								selectedIndex={selectedIndex}
							>
								{stop.name}
							</S.ConnectionText>
						</Link>
					</S.ConnectionsBox>
				)
			})}
		</>
	)
}

export default ConnectionDiagram
