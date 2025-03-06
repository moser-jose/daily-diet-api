import { EditMealUseCase } from './Edit-meal-use-case'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let inMemoryMealsRepository: InMemoryMealsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditMealUseCase

describe('Edit Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to edit a meal by user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const newMeal = await inMemoryMealsRepository.create(
      {
        name: 'Meal 1',
        description: 'Meal 1 description',
        isEntry: true,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      user.id,
    )

    await sut.execute({
      mealId: newMeal.id,
      userId: user.id,
      name: 'Meal 2',
      description: 'Meal 2 description',
      isEntry: false,
    })

    expect(inMemoryMealsRepository.items[0].name).toEqual('Meal 2')
    expect(inMemoryMealsRepository.items[0].description).toEqual('Meal 2 description')
    expect(inMemoryMealsRepository.items[0].isEntry).toEqual(false)
  })
})
