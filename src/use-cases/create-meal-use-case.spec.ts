import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateMealUseCase } from './create-meal-use-case'

let inMemoryMealsRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(inMemoryMealsRepository)
  })

  it('should to create a meal by user', async () => {
    const { meal } = await sut.execute({
      name: 'Massa de batata',
      description: 'Massa de batata com queijo',
      isEntry: true,
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
