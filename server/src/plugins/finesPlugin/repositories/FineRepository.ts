import { BaseRepository } from "../../helpers/BaseRepository"
import { Fine } from "../models/Fine"

class Repository extends BaseRepository {
	public async getById(id: number): Promise<{ fine: Fine | null }> {
		const response = await this.db.query`
            SELECT *
            FROM Fines
            WHERE Id=${id}
        `

		return { fine: response.recordset[0] }
	}

	public async getAll(passengerId: number, isPaid?: boolean): Promise<{ fines: Array<Fine> }> {
		let query = `
            SELECT *
            FROM Fines
            WHERE PassengerId=@PassengerId
        `
		if (isPaid !== undefined) {
			query += ` AND IsPaid=@IsPaid`
		}

		const response = await this.db
			.request()
			.input("PassengerId", passengerId)
			.input("IsPaid", isPaid)
			.query(query)

		return { fines: response.recordset }
	}

	public async resolveOne(fine: Fine): Promise<{ id: number }> {
		await this.db.query`
            UPDATE Fines
            SET IsPaid=1
            WHERE Id=${fine.Id}
        `

		return { id: fine.Id }
	}
}

export const FineRepository = new Repository()
