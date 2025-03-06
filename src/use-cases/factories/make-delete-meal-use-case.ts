import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { DeleteMealUseCase } from '../delete-meal-use-case'

export function makeDeleteMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new DeleteMealUseCase(mealsRepository)

  return useCase
}
