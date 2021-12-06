import { PagingRequest, PagingResponse } from "../../../../types/Paging"
import { BaseRepository } from "../../helpers/BaseRepository"
import { parseDbToObject } from "../../helpers/dbObject"
import { QueriedTicket, SingleTicket, Ticket } from "../models/Ticket"

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

		return {
			total: totalResult.recordset[0].Count,
			rows: result.recordset.map(parseDbToObject),
		}
	}

	public async getPassengerTicket(id: number): Promise<{ ticket: SingleTicket | null }> {
		const result = await this.db.query`SELECT 
			T.Id, T.StartDate, T.EstimatedEndDate, T.BoughtAt, T.CalculatedPrice,
			BL.Id as 'BusLine.Id', BL.LineNumber as 'BusLine.LineNumber',
			TT.Id as 'TicketType.Id', TT.Name as 'TicketType.Name', TT.Price as 'TicketType.Price', TT.Length as 'TicketType.Length',
			T.PassengerId as 'PassengerId',
			D.Id as 'Discount.Id', D.Name as 'Discount.Name', D.Percentage as 'Discount.Percentage'
			FROM Tickets as T
			LEFT JOIN BusLines BL ON BL.Id = BusLineId
			LEFT JOIN TicketTypes TT ON TT.Id = TicketTypeId
			LEFT JOIN Discounts D ON D.Id = DiscountId
			WHERE T.Id=${id}
		`

		return {
			ticket: parseDbToObject(result.recordset[0]),
		}
	}
}

export const TicketRepository = new Repository()
