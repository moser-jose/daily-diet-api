import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeEditMealUseCase } from '@/use-cases/factories/make-edit-meal-use-case'

export async function editMeal(request: FastifyRequest, reply: FastifyReply) {
  try {
    const editMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const editMealBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      isEntry: z.boolean(),
    })

    const { id } = editMealParamsSchema.parse(request.params)
    const { name, description, isEntry } = editMealBodySchema.parse(request.body)

    const editMealUseCase = makeEditMealUseCase()

    await editMealUseCase.execute({
      mealId: id,
      userId: request.user.sub,
      name,
      description: description ?? '',
      isEntry,
    })

    return reply.status(200).send()
  } catch (err) {
    if (err instanceof SyntaxError) {
      return reply.status(400).send({ message: 'Invalid JSON format in request body.' })
    }

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
