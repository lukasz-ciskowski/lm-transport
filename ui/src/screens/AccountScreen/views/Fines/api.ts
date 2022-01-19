import axios from "axios"
import { FinesResult } from "./types"

export async function getFines(): Promise<FinesResult> {
	return {
		fines: [
			{
				id: 1,
				date: new Date().toString(),
				is_paid: false,
			},
		],
	}
	// const result = await axios.get("/api/fines", { params: { is_paid } })
	// return result.data
}
