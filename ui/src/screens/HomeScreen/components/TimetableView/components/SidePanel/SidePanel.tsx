import { ArrowBack } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { Directions } from "common/Directions"
import { useRouterQuery } from "hooks/useRouterQuery"
import { Link, Path, useParams } from "react-router-dom"
import { TimetableBaseProps } from "../../types"
import ConnectionDiagram from "../ConnectionDiagram"
import * as S from "./styles"

type Props = Pick<TimetableBaseProps, "schemas"> & { prevRoute: Partial<Path> }

type Params = { bus_line: string; bus_stop: string }

function SidePanel({ schemas, prevRoute }: Props) {
	const { bus_line, bus_stop } = useParams<Params>()
	const query = useRouterQuery()

	const direction = (query.get("direction") as Directions | null) || Directions.Forward
	const selectedRoute = schemas?.routes.find(([dir]) => dir === Number(direction))

	if (!selectedRoute || !bus_line) return <></>

	return (
		<S.SidePanelContainer
			container
			item
			xs={3}
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
		>
			<S.HeaderBox>
				<Link to={prevRoute}>
					<IconButton>
						<ArrowBack />
					</IconButton>
				</Link>
				<S.TitleBox>
					<Typography variant="subtitle1">Kierunek</Typography>
					<Typography variant="h6">
						{selectedRoute[1][selectedRoute[1].length - 1].name}
					</Typography>
				</S.TitleBox>
			</S.HeaderBox>
			<ConnectionDiagram
				busLineId={bus_line}
				route={selectedRoute}
				selectedBusStop={bus_stop ? Number(bus_stop) : undefined}
			/>
		</S.SidePanelContainer>
	)
}

export default SidePanel
