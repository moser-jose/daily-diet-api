import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createMeal } from './create-meal'
import { deleteMeal } from './delete-meal'
import { editMeal } from './edit-meal'
import { getMeal } from './get-meal'
import { getAllMeal } from './get-all-meal'

export async function mealsRoutes(app: FastifyInstance) {
  // All meal routes require authentication
  app.addHook('onRequest', verifyJwt)

  app.get('/', getAllMeal)
  app.get('/:id', getMeal)
  app.post('/', createMeal)
  app.put('/:id', editMeal)
  app.delete('/:id', deleteMeal)
}
