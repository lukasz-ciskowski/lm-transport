import { Directions } from "common/Directions"
import { generatePath, Link } from "react-router-dom"
import { BusStop } from "screens/HomeScreen/types"
import { BUS_STOP } from "urls"
import * as S from "./styles"

interface Props {
	route: [Directions.Forward | Directions.Backwards, Array<Pick<BusStop, "id" | "name">>]
	busLineId: string | undefined
}

function ConnectionDiagram({ route, busLineId }: Props) {
	return (
		<>
			{route[1].map((stop, index) => {
				return (
					<S.ConnectionsBox>
						<S.ConnectionImg index={index} totalSize={route[1].length} />
						<Link
							to={generatePath(BUS_STOP, {
								bus_line: busLineId,
								bus_stop: stop.id.toString(),
							})}
						>
							<S.ConnectionText index={index} totalSize={route[1].length}>
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
