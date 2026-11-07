import type { components, paths } from './api-types'

// Contract-shaped order (from API)
type ApiOrder = components['schemas']['Order']

// Response envelope from the contract
type ApiOrdersPage =
  paths['/orders']['get']['responses'][200]['content']['application/json']

// Screen-facing order: eta converted to minutesRemaining
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
  const ms = new Date(eta).getTime() - Date.now()
  return Math.max(0, Math.round(ms / 60_000))
}

function toOrder(apiOrder: ApiOrder): Order {
  return {
    id: apiOrder.id,
    item: apiOrder.item,
    status: apiOrder.status,
    minutesRemaining: etaToMinutes(apiOrder.eta),
  }
}

export async function fetchOrders(page: number, limit: number): Promise<OrdersPage> {
  const url = `http://localhost:8000/orders?page=${page}&limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`)
  const data: ApiOrdersPage = await res.json()
  return {
    orders: data.orders.map(toOrder),
    page: data.page,
    limit: data.limit,
    total: data.total,
  }
}
