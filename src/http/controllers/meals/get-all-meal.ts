import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeGetAllMealUseCase } from '@/use-cases/factories/make-get-all-meal-use-case'

export async function getAllMeal(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getAllMealQuerySchema = z.object({
      page: z.coerce.number().optional().default(1),
    })

    const { page } = getAllMealQuerySchema.parse(request.query)

    const getAllMealUseCase = makeGetAllMealUseCase()

    const { meals } = await getAllMealUseCase.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({
      meals,
      pagination: {
        page,
        total: meals.length,
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: err.format(),
      })
    }

    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    console.error(err)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
