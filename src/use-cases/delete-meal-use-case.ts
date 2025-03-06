import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteMealUseCaseRequest {
  mealId: string
  userId: string
}

interface DeleteMealUseCaseResponse {}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ mealId, userId }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new UnauthorizedError()
    }

    await this.mealsRepository.delete(mealId, userId)

    return {}
  }
}
