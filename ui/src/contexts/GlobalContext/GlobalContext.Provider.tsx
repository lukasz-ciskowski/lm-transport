import React, { useCallback, useMemo, useState } from "react"
import { GlobalContextDispatch, GlobalContextState } from "./GlobalContext"
import { GlobalState } from "./GlobalContext"

interface Props {
	children: React.ReactNode
}

function GlobalContextProvider({ children }: Props) {
	const [state, setState] = useState<GlobalState>({
		busLines: [],
		discounts: [],
		ticketTypes: [],
	})

	const handleSetData = useCallback((data: GlobalState) => setState(data), [])

	const dispatcher = useMemo(() => ({ loadAll: handleSetData }), [handleSetData])

	return (
		<GlobalContextDispatch.Provider value={dispatcher}>
			<GlobalContextState.Provider value={state}>{children}</GlobalContextState.Provider>
		</GlobalContextDispatch.Provider>
	)
}

export default GlobalContextProvider
