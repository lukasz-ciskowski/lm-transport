import axios from "axios"
import { FinesResult } from "./types"

export async function getFines(): Promise<FinesResult> {
	const result = await axios.get("/api/fines")
	return result.data
}
