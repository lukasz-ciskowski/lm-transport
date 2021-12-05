import { PagingRequest, PagingResponse } from "../../../../types/Paging"
import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { QueriedTicket, Ticket } from "../models/Ticket"

class Repository extends BaseRepository {
	public async createTicket(body: Omit<Ticket, "Id">): Promise<{ id: number }> {
		const result = await this.db.query`
            INSERT INTO Tickets
            OUTPUT inserted.Id
            VALUES (
                ${body.Passenger.Id}, ${body.BusLine.Id}, ${body.StartDate},
                ${body.EstimatedEndDate}, ${body.CalculatedPrice}, ${body.BoughtAt},
                ${body.TicketType.Id}, ${body.Discount?.Id}
            )
        `

		return { id: result.recordset[0].Id }
	}

	public async queryPassengerTickets(
		passengerId: number,
		paging: PagingRequest,
		active?: boolean
	): Promise<PagingResponse<Array<QueriedTicket>>> {
		let query = `SELECT 
            T.Id, T.StartDate, T.EstimatedEndDate, BL.Id as 'BusLine.Id', BL.LineNumber as 'BusLine.LineNumber'
            FROM Tickets as T
            LEFT JOIN BusLines BL ON BL.Id = BusLineId
        `
		let where = ` WHERE PassengerId=@PassengerId`

		if (active !== undefined) {
			if (active === true) where += ` AND EstimatedEndDate >= GETDATE()`
			else if (active === false) where += ` AND EstimatedEndDate < GETDATE()`
		}
		query +=
			where + ` ORDER BY BoughtAt DESC OFFSET @PageOffset ROWS FETCH NEXT @PageSize ROWS ONLY`
		const result = await this.db
			.request()
			.input("PassengerId", passengerId)
			.input("PageOffset", (paging.page - 1) * paging.size)
			.input("PageSize", paging.size)
			.query(query)

		const totalQuery =
			`SELECT COUNT(Id) as Count
            FROM Tickets
        ` + where
		const totalResult = await this.db
			.request()
			.input("PassengerId", passengerId)
			.query(totalQuery)

		console.log(result.recordset.map(parseDbToObject))

		return {
			total: totalResult.recordset[0].Count,
			rows: result.recordset.map(parseDbToObject),
		}
	}
}

export const TicketRepository = new Repository()
