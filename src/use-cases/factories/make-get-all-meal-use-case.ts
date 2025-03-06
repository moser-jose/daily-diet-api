import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetAllMealUserUseCase } from '../get-all-meal-user-use-case'

export function makeGetAllMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetAllMealUserUseCase(mealsRepository)

  return useCase
}
