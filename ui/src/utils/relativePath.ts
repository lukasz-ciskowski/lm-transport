export function relativePath(absolute: string, base: string) {
    if (base.charAt(base.length - 1) !== '*') return absolute
	// slice skips '*'
	return absolute.replace(base.slice(0, -1), "")
}
