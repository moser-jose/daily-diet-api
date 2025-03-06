import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealUserUseCase } from '../get-meal-user-use-case'

export function makeGetMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetMealUserUseCase(mealsRepository)

  return useCase
}
