import { SingleDiscount } from "models/discount"
import { SingleTicketType } from "models/ticketType"
import { createContext } from "react"
import { SingleBusLine } from "../../models/busLine"

export interface GlobalState {
	busLines: SingleBusLine[]
	ticketTypes: SingleTicketType[]
	discounts: SingleDiscount[]
}

export const GlobalContextState = createContext<GlobalState>({
	busLines: [],
	ticketTypes: [],
	discounts: [],
})

interface Dispatcher {
	loadAll: (data: GlobalState) => void
}

export const GlobalContextDispatch = createContext<Dispatcher>({
	loadAll: () => null,
})
