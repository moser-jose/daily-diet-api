import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
export interface GetAllMealUserUseCaseRequest {
  userId: string
  page: number
}

export interface GetAllMealUserUseCaseResponse {
  meals: Meal[]
}

export class GetAllMealUserUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    userId,
    page,
  }: GetAllMealUserUseCaseRequest): Promise<GetAllMealUserUseCaseResponse> {
    const meals = await this.mealsRepository.findManyByUserId(userId, page)

    console.log('meals', meals)

    return {
      meals,
    }
  }
}
