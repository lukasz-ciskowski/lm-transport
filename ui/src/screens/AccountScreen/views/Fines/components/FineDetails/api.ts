import axios from "axios"
import { FineRetrieval } from "./types"

export const retrieveFine = (id: number) => async (): Promise<FineRetrieval> => {
	const result = await axios.get(`/api/fines/${id}`)
	return result.data
}

export const payFine = async (id: number): Promise<void> => {
	const result = await axios.patch(`/api/fines/${id}`)
	return result.data
}
