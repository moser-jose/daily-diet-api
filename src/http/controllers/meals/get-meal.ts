import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeGetMealUseCase } from '@/use-cases/factories/make-get-meal-use-case'

export async function getMeal(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealParamsSchema.parse(request.params)

    const getMealUseCase = makeGetMealUseCase()

    const { meal } = await getMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
    })

    return reply.status(200).send({ meal })
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
