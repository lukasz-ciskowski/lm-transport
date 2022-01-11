import { useContext } from "react"
import { GlobalContextDispatch, GlobalContextState } from "./GlobalContext"

export const useGlobalDispatch = () => {
	return useContext(GlobalContextDispatch)
}

export const useGlobalData = () => {
	return useContext(GlobalContextState)
}
