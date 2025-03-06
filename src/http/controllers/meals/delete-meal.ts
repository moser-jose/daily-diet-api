import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  try {
    const deleteMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteMealParamsSchema.parse(request.params)

    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
    })

    return reply.status(204).send()
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
