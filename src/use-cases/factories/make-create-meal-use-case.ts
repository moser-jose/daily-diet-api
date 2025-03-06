import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { CreateMealUseCase } from '../create-meal-use-case'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CreateMealUseCase(mealsRepository)

  return useCase
}
