import { mockOrders } from './mockOrders'
import type { Order } from './mockOrders'

const statusClass: Record<Order['status'], string> = {
  preparing: 'badge-preparing',
  'on the way': 'badge-on-the-way',
  delivered: 'badge-delivered',
}

function OrdersScreen() {
  return (
    <main className="orders">
      <h1>Your orders</h1>
      <ul className="order-list">
        {mockOrders.map((order) => (
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
    </main>
  )
}

export default OrdersScreen
