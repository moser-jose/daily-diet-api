import { MealsRepository } from '@/repositories/meals-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  mealsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const mealsCount = await this.mealsRepository.countByUserId(userId)

    return {
      mealsCount,
    }
  }
}
