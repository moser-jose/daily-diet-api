import { Meal, Prisma } from '@prisma/client'

export interface MealsRepository {
  findById(id: string): Promise<Meal | null>
  findByUserId(id: string, userId: string): Promise<Meal | null>
  findManyByUserId(userId: string, page: number): Promise<Meal[]>
  searchManyByUserId(userId: string, query: string, page: number, per_page: number): Promise<Meal[]>
  create(data: Prisma.MealCreateInput, userId: string): Promise<Meal>
  save(meal: Meal, userId: string): Promise<Meal>
  delete(id: string, userId: string): Promise<void>
  countByUserId(userId: string): Promise<number>
}
