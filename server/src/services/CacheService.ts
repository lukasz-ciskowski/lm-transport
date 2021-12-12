import NodeCache from "node-cache"

export class CacheService {
	private readonly _cache: NodeCache
	constructor(seconds: number) {
		this._cache = new NodeCache({
			stdTTL: seconds,
			checkperiod: seconds * 0.2,
			useClones: false,
		})
	}

	async get<T>(key: string, storeFunction: () => Promise<T>) {
		const value = this._cache.get(key)
		if (value) {
			return Promise.resolve(value as T)
		}

		return storeFunction().then((result) => {
			this._cache.set(key, result)
			return result
		})
	}

	del(key: string) {
		this._cache.del(key)
	}

	flush() {
		this._cache.flushAll()
	}
}
