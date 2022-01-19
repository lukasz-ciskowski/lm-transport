import axios from "axios"
import moment from "moment"
import { FormState } from "./types"

export async function buyTicket(form: FormState): Promise<void> {
	const result = await axios.post("/api/tickets", {
		bus_line: form.bus_line,
		start_date: moment(form.start_date)
			.hours(form.start_time.getHours())
			.minutes(form.start_time.getMinutes())
			.startOf("minute")
			.toDate(),
		ticket_type: form.ticket_type,
		discount: form.discount,
	})
	return result.data
}
