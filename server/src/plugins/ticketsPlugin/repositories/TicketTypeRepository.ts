import { BaseRepository } from "../../helpers/BaseRepository"
import { TicketType } from "../models/TicketType"

class Repository extends BaseRepository {
	public async getAll(): Promise<{ ticketTypes: Array<TicketType> }> {
		const result = await this.db.query`
            SELECT * FROM TicketTypes
        `

		return { ticketTypes: result.recordset }
	}

    public async getById(id: number): Promise<{ ticketType: TicketType | null }> {
		const result = await this.db.query`
            SELECT * FROM TicketTypes WHERE Id=${id} 
        `

		return { ticketType: result.recordset[0] }
	}
}

export const TicketTypeRepository = new Repository()
