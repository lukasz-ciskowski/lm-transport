import { FastifyServerOptions } from "fastify"
import ConfigService from "./services/ConfigService"
import { WebService } from "./services/WebService"
import { DbService } from "./services/DbService"

let _service: WebService | undefined
let _dbClient: DbService | undefined

const start = async (): Promise<void> => {
	try {
		const config = ConfigService.load()

		const fastifyOptions: FastifyServerOptions = {
			logger: {
				prettyPrint: { translateTime: "HH:MM:ss Z" },
			},
		}

		_service = await WebService.configure(fastifyOptions)

		_dbClient = await DbService.connect()
		if (!_dbClient) return
		
		_service.instance.log.info("Established database connection")

		_service.start(config.host)
	} catch (error) {
		console.log("Failed running instance:", error)
	}
}

const shutdown = async (code: number = 0): Promise<never> => {
	if (!!_dbClient) {
		await _dbClient.close()
	}
	if (!!_service) {
		await _service.close()
	}

	process.exit(code)
}

process
	.on("SIGINT", () => shutdown())
	.on("SIGTERM", () => shutdown())
	.on("uncaughtException", async (err: Error) => {
		const exceptionMessage = `Unhandled exception ${err.toString()}`
		_service?.instance.log.error(exceptionMessage)
		await shutdown(1)
	})
	.on("unhandledRejection", async (reason) => {
		const exceptionMessage = `Unhandled rejection ${reason}`
		_service?.instance.log.error(exceptionMessage)
		await shutdown(1)
	})

start()
