import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { DeleteMealUseCase } from './delete-meal-use-case'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UnauthorizedError } from './errors/unauthorized-error'

let inMemoryMealsRepository: InMemoryMealsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    inMemoryMealsRepository = new InMemoryMealsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteMealUseCase(inMemoryMealsRepository)
  })

  it('should be able to delete a meal by user', async () => {
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
    })

    expect(inMemoryMealsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a meal created by another user', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    // Create the second user who will try to delete the meal
    const user2 = await inMemoryUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    // Create a meal by the first user
    const meal = await inMemoryMealsRepository.create(
      {
        name: 'Meal 1',
        description: 'Meal 1 description',
        isEntry: true,
        user: {
          connect: {
            id: user1.id,
          },
        },
      },
      user1.id,
    )

    // Try to delete the meal with the second user
    await expect(() =>
      sut.execute({
        mealId: meal.id,
        userId: user2.id,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)

    // Verify that the meal still exists
    expect(inMemoryMealsRepository.items).toHaveLength(1)
  })
})
