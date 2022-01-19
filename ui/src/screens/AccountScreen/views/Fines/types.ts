import { SingleFine } from "screens/AccountScreen/models/fine"

export interface FinesResult {
	fines: Omit<SingleFine, "fine_price">[]
}
