import bcrypt from "bcryptjs"

const password = (salt: string) => (password: string) => {
	const verify = async (toVerify: string) => {
        return await bcrypt.compare(toVerify, password)
    }
    const hash = async () => {
        return await bcrypt.hash(password, parseInt(salt))
    }

    return {
        verify, 
        hash
    }
}

export default {
	password,
}

declare module "fastify" {
	export interface FastifyInstance {
		password: (passwd: string) => {
            verify: (toVerify: string) => Promise<boolean>
            hash: () => Promise<string>
        }
	}
}
