import { InMemoryUserMealsRepository } from '@/repositories/in-memory/in-memory-user-meals-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let userMealsRepository: InMemoryUserMealsRepository
let sut: GetUserMetricsUseCase

describe.skip('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    userMealsRepository = new InMemoryUserMealsRepository()
    sut = new GetUserMetricsUseCase(userMealsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await userMealsRepository.create({
      meal_id: 'meal-01',
      user_id: 'user-01',
    })

    await userMealsRepository.create({
      meal_id: 'meal-02',
      user_id: 'user-01',
    })

    const result = await sut.execute({
      userId: 'user-01',
    })

    expect(result).toEqual(2)
  })
})
