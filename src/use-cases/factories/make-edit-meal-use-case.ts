import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { EditMealUseCase } from '../Edit-meal-use-case'

export function makeEditMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new EditMealUseCase(mealsRepository)

  return useCase
}
