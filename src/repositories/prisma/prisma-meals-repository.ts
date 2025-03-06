import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealsRepository } from '../meals-repository'

export class PrismaMealsRepository implements MealsRepository {
  async findById(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })
    return meal
  }
  async countByUserId(userId: string): Promise<number> {
    const meals = await prisma.meal.count({
      where: {
        user_id: userId,
      },
    })
    return meals
  }
  async findByUserId(mealId: string, userId: string) {
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
        user_id: userId,
      },
    })

    return meal
  }
  async findManyByUserId(userId: string, page: number) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return meals
  }

  async searchManyByUserId(userId: string, query: string, page: number) {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return meals
  }

  async create(data: Prisma.MealCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async save(data: Meal, userId: string) {
    const meal = await prisma.meal.update({
      where: {
        id: data.id,
        user_id: userId,
      },
      data,
    })

    return meal
  }

  async delete(id: string) {
    await prisma.meal.delete({
      where: { id },
    })
  }
}
