import { BaseRepository } from "../../helpers/BaseRepository"
import { Fine } from "../models/Fine"
import { Fines } from "../models/Fines"

class Repository extends BaseRepository {
	public async getFine(id: number): Promise<{ fine: Fine | null }> {
		const response = await this.db.query`
            SELECT *
            FROM Fines
            WHERE Id=${id}
        `

		return { fine: response.recordset[0] }
	}

	public async getFines(passengerId: number, isPaid?: boolean): Promise<{ fines: Fines }> {
		let query = `
            SELECT *
            FROM Fines
            WHERE PassengerId=@PassengerId
        `
		if (isPaid !== undefined) {
			query += ` AND IsPaid=@IsPaid`
		}

		console.log(query)

		const response = await this.db
			.request()
			.input("PassengerId", passengerId)
			.input("IsPaid", Number(isPaid))
			.query(query)

		return { fines: response.recordset }
	}

	public async resolveFine(fine: Fine): Promise<{ id: number }> {
		await this.db.query`
            UPDATE Fines
            SET IsPaid=1
            WHERE Id=${fine.Id}
        `

		return { id: fine.Id }
	}
}

export const FineRepository = new Repository()
