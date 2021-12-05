import { BaseRepository } from "../../helpers/BaseRepository"
import { Passenger } from "../models/Passenger"

class Repository extends BaseRepository {
	public async countLogins(login: string): Promise<{ count: number }> {
		const response = await this.db.query`
            SELECT COUNT(Login) as Count
            FROM Passengers
            WHERE Login=${login}
        `

		return { count: response.recordset[0].Count }
	}

	public async createUser(user: Omit<Passenger, "Id">): Promise<{ id: number }> {
		const response = await this.db.query`
            INSERT INTO Passengers 
            OUTPUT inserted.Id
            VALUES 
            (${user.Login}, ${user.Password}, ${user.FirstName}, ${user.LastName}, ${user.CardNumber})
        `

		return { id: response.recordset[0].Id }
	}

	public async getByLogin(login: string): Promise<{ passenger: Passenger | null }> {
		const response = await this.db.query`
            SELECT * FROM Passengers
            WHERE Login=${login}
        `

		return { passenger: response.recordset[0] }
	}

	public async getById(id: number): Promise<{ passenger: Passenger | null }> {
		const response = await this.db.query`
            SELECT * FROM Passengers
            WHERE Id=${id}
        `

		return { passenger: response.recordset[0] }
	}
}

export const AuthRepository = new Repository()
