import { mockOrders } from './mockOrders'
import type { Order } from './mockOrders'

export type { Order }

export type OrdersPage = {
  orders: Order[]
  page: number
  limit: number
  total: number
}

// Real call for later:
// GET http://localhost:8000/orders?page=1&limit=5
export async function fetchOrders(page: number, limit: number): Promise<OrdersPage> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const start = (page - 1) * limit
  return {
    orders: mockOrders.slice(start, start + limit),
    page,
    limit,
    total: mockOrders.length,
  }
}
