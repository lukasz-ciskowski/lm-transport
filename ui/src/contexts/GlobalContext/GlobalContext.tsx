import { createContext } from "react"
import { SingleBusLine } from "./types"

export interface GlobalState {
	busLines: SingleBusLine[]
}

export const GlobalContextState = createContext<GlobalState | undefined>(undefined)

interface Dispatcher {
	loadAll: (data: GlobalState) => void
}

export const GlobalContextDispatch = createContext<Dispatcher>({
	loadAll: () => null,
})
