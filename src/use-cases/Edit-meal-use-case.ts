import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface EditMealUseCaseRequest {
  mealId: string
  userId: string
  name: string
  description: string
  isEntry: boolean
}

interface EditMealUseCaseResponse {}

export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    userId,
    name,
    description,
    isEntry,
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)

    if (!meal) {
      throw new ResourceNotFoundError()
    }

    if (meal.user_id !== userId) {
      throw new UnauthorizedError()
    }

    meal.name = name
    meal.description = description
    meal.isEntry = isEntry

    await this.mealsRepository.save(meal, userId)

    return {
      meal,
    }
  }
}
