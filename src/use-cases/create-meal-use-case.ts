import { MealsRepository } from '@/repositories/meals-repository'
import { Meal } from '@prisma/client'

interface CreateMealUseCaseRequest {
  name: string
  description?: string
  isEntry?: boolean
  userId: string
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    name,
    description,
    isEntry,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = await this.mealsRepository.create(
      {
        name,
        description,
        isEntry,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      userId,
    )

    return {
      meal,
    }
  }
}
