import type { components, paths } from './api-types'

type ApiOrder = components['schemas']['Order']
type ApiResponse =
  paths['/orders']['get']['responses'][200]['content']['application/json']

export type Order = {
  id: number
  item: string
  status: 'preparing' | 'on the way' | 'delivered'
  minutesRemaining: number
}

export type OrdersPage = {
  orders: Order[]
  page: number
  limit: number
  total: number
}

function etaToMinutes(eta: string): number {
  const diff = new Date(eta).getTime() - Date.now()
  return Math.max(0, Math.round(diff / 60000))
}

function mapOrder(raw: ApiOrder): Order {
  return {
    id: raw.id,
    item: raw.item,
    status: raw.status,
    minutesRemaining: etaToMinutes(raw.eta),
  }
}

export async function fetchOrders(page: number, limit: number): Promise<OrdersPage> {
  const res = await fetch(`http://localhost:8000/orders?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`)
  const data: ApiResponse = await res.json()
  return {
    orders: data.orders.map(mapOrder),
    page: data.page,
    limit: data.limit,
    total: data.total,
  }
}
