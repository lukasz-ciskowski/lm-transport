import { has, util } from "config"
import { config as DatabaseConfig } from "mssql"

export interface AuthConfig {
	salt: string
	secret: string
	tokenExpiry: string
}

export interface HostConfig {
	address: string
	port: number
}

type Sections = "host" | "database" | "auth"

const utilObject = util.toObject()
export default class ConfigService {
	private static _instance: ConfigService
	constructor(
		public readonly host: HostConfig,
		public readonly db: DatabaseConfig,
		public readonly auth: AuthConfig
	) {}

	private static read<T>(section: Sections): T {
		if (!utilObject[section]) {
			throw new Error(`Missing section ${section}`)
		}
		return utilObject[section]
	}

	public static load() {
		this._instance = new ConfigService(
			this.read<HostConfig>("host"),
			this.read<DatabaseConfig>("database"),
			this.read<AuthConfig>("auth")
		)
		return this._instance
	}

	public static get config() {
		return this._instance
	}
}
