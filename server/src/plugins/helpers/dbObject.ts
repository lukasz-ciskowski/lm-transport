function keyToObject(record: string, value: any, acc: any): any {
	const keys = record.split(".")
	if (keys?.length === 1) {
		acc[keys[0]] = value ?? undefined // avoid saving nulls
	} else {
		if (!acc[keys[0]]) acc[keys[0]] = {}
		keyToObject(keys.splice(1).join("."), value, acc[keys[0]])
		if (Object.values(acc[keys[0]]).filter((v) => v !== undefined).length === 0)
			acc[keys[0]] = undefined
	}
}

export function parseDbToObject(record: any): any {
	if (!record) return record

	return Object.keys(record).reduce((acc, curr) => {
		keyToObject(curr, record[curr], acc)
		return acc
	}, {})
}
