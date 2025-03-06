import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'
import { UnauthorizedError } from './errors/unauthorized-error'
export interface GetMealUserUseCaseRequest {
  mealId: string
  userId: string
}

export interface GetMealUserUseCaseResponse {
  meal: Meal | null
}

export class GetMealUserUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
  }: GetMealUserUseCaseRequest): Promise<GetMealUserUseCaseResponse> {
    const meal = await this.mealsRepository.findByUserId(mealId, userId)

    if (!meal) {
      return {
        meal: null,
      }
    }

    if (meal.user_id !== userId) {
      throw new UnauthorizedError()
    }

    return {
      meal,
    }
  }
}
