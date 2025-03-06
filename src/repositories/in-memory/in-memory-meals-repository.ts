import { MealsRepository } from '@/repositories/meals-repository'
import { Meal, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find(item => item.id === id)

    if (!meal) {
      return null
    }

    return meal
  }
  async countByUserId(userId: string): Promise<number> {
    return this.items.filter(item => item.user_id === userId).length
  }

  async findByUserId(mealId: string, userId: string) {
    const meal = this.items.find(item => item.user_id === userId && item.id === mealId)

    if (!meal) {
      return null
    }

    return meal
  }

  async findManyByUserId(userId: string, page: number) {
    const meals = this.items.filter(item => item.user_id === userId)

    return meals.slice((page - 1) * 20, page * 20)
  }

  async searchManyByUserId(userId: string, query: string, page: number) {
    const meals = this.items.filter(item => item.user_id === userId && item.name.includes(query))

    return meals.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.MealCreateInput, userId: string) {
    const meal = {
      id: data.id ?? randomUUID(),
      user_id: userId,
      name: data.name,
      description: data.description ?? null,
      isEntry: data.isEntry ?? false,
      created_at: new Date(),
      updated_at: null,
    }

    this.items.push(meal)

    return meal
  }

  async save(meal: Meal, userId: string): Promise<Meal> {
    const mealIndex = this.items.findIndex(item => item.id === meal.id && item.user_id === userId)

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal
    }

    return meal
  }

  async delete(id: string, userId: string): Promise<void> {
    this.items = this.items.filter(item => item.id !== id && item.user_id === userId)
  }
}
