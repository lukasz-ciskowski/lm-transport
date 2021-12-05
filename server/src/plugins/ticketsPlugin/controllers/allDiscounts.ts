import { Type } from "@sinclair/typebox"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify"
import { Discount } from "../models/Discount"
import { Schemas, DiscountSchema } from "../schemas/discountSchema"
import { DiscountService } from "../services/DiscountService"

module RequestSchemas {
	export const Response = Type.Object({
		discounts: Type.Array(Schemas.Discount),
	})
}

export const ROUTE_OPTIONS: RouteShorthandOptions = {
	schema: {
		tags: ["tickets"],
		response: {
			200: RequestSchemas.Response,
		},
	},
}

export async function allDiscounts(req: FastifyRequest, res: FastifyReply) {
	const result = await DiscountService.getDiscounts()
	res.code(200).send({ discounts: result.map(adapt) })
}

function adapt(discount: Discount): DiscountSchema {
	return {
		id: discount.Id,
		name: discount.Name,
		percentage: discount.Percentage,
	}
}
