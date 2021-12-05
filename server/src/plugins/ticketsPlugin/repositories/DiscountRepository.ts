import { BaseRepository } from "../../helpers/BaseRepository"
import { Discount } from "../models/Discount"

class Repository extends BaseRepository {
	public async getAll(): Promise<{ ticketTypes: Array<Discount> }> {
		const result = await this.db.query`
            SELECT * FROM Discounts
        `

		return { ticketTypes: result.recordset }
	}

    public async getById(id: number): Promise<{ ticketType: Discount | null }> {
		const result = await this.db.query`
            SELECT * FROM Discounts WHERE Id=${id} 
        `

		return { ticketType: result.recordset[0] }
	}
}

export const DiscountRepository = new Repository()
