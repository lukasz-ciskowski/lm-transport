import { BusStop } from "screens/HomeScreen/types"
import { TimetableBaseProps } from "../../types"

export interface BusStopContainerBaseProps extends TimetableBaseProps {
	busStop: SingleBusStopResult | undefined
}

export interface SingleBusStopResult {
	bus_stop: BusStop
}
