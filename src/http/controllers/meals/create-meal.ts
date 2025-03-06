import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  /* try { */

  console.log('k')
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    isEntry: z.boolean(),
  })

  const { name, description, isEntry } = createMealBodySchema.parse(request.body)

  const createMealUseCase = makeCreateMealUseCase()

  await createMealUseCase.execute({
    name,
    userId: request.user.sub,
    description,
    isEntry,
  })

  return reply.status(201).send()
  /* } catch (err) {
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
  } */
}
