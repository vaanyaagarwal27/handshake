import { useEffect, useState } from 'react'
import { fetchOrders } from './api'
import type { Order, OrdersPage } from './api'

const LIMIT = 5

const statusClass: Record<Order['status'], string> = {
  preparing: 'badge-preparing',
  'on the way': 'badge-on-the-way',
  delivered: 'badge-delivered',
}

function OrdersScreen() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<OrdersPage | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchOrders(page, LIMIT).then((result) => {
      if (!cancelled) setData(result)
    })
    return () => {
      cancelled = true
    }
  }, [page])

  // Loading until the response for the current page has arrived
  const loading = data === null || data.page !== page
  const totalPages = data ? Math.max(1, Math.ceil(data.total / LIMIT)) : 1

  return (
    <main className="orders">
      <h1>Your orders</h1>
      {loading ? (
        <p className="orders-loading">Loading…</p>
      ) : (
        <ul className="order-list">
          {data.orders.map((order) => (
            <li key={order.id} className="order-card">
              <div className="order-main">
                <span className="order-item">{order.item}</span>
                <span className={`badge ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="order-eta">
                {order.status === 'delivered'
                  ? 'Delivered'
                  : `Arriving in ${order.minutesRemaining} min`}
              </p>
            </li>
          ))}
        </ul>
      )}
      <nav className="pager">
        <button
          type="button"
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="pager-label">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          disabled={loading || page >= totalPages}
        >
          Next
        </button>
      </nav>
    </main>
  )
}

export default OrdersScreen
