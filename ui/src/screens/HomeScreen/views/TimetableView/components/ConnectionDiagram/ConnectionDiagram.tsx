import { Directions } from "common/Directions"
import { BusStop } from "models/busStop"
import qs from "qs"
import { generatePath, Link } from "react-router-dom"
import { BUS_STOP, TIMETABLE } from "urls"
import * as S from "./styles"

interface Props {
	route: Array<Pick<BusStop, "id" | "name">>
	direction: Directions.Forward | Directions.Backwards
	busLineId: string
	selectedBusStop?: number | undefined
}

function ConnectionDiagram({ route, busLineId, selectedBusStop, direction }: Props) {
	const selectedIndex = selectedBusStop
		? route.findIndex((stop) => stop.id === selectedBusStop)
		: undefined
	return (
		<>
			{route.map((stop, index) => {
				return (
					<S.ConnectionsBox>
						<S.ConnectionImg index={index} totalSize={route.length} />
						<Link
							to={{
								pathname: generatePath(`${TIMETABLE}/${BUS_STOP}`, {
									bus_line: busLineId,
									bus_stop: stop.id.toString(),
								}),
								search: qs.stringify({ direction: direction }),
							}}
						>
							<S.ConnectionText
								index={index}
								totalSize={route.length}
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
