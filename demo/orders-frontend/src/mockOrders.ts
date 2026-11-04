export type Order = {
  id: number
  item: string
  status: 'preparing' | 'on the way' | 'delivered'
  minutesRemaining: number
}

export const mockOrders: Order[] = [
  { id: 1, item: 'Margherita Pizza', status: 'preparing', minutesRemaining: 28 },
  { id: 2, item: 'Chicken Tikka Masala', status: 'on the way', minutesRemaining: 12 },
  { id: 3, item: 'Pad Thai', status: 'delivered', minutesRemaining: 0 },
  { id: 4, item: 'Double Cheeseburger & Fries', status: 'on the way', minutesRemaining: 7 },
  { id: 5, item: 'Salmon Poke Bowl', status: 'preparing', minutesRemaining: 22 },
  { id: 6, item: 'Veggie Burrito', status: 'delivered', minutesRemaining: 0 },
  { id: 7, item: 'Spicy Tonkotsu Ramen', status: 'preparing', minutesRemaining: 31 },
  { id: 8, item: 'Caesar Salad', status: 'on the way', minutesRemaining: 4 },
  { id: 9, item: 'Butter Chicken & Garlic Naan', status: 'delivered', minutesRemaining: 0 },
  { id: 10, item: 'Falafel Wrap', status: 'on the way', minutesRemaining: 15 },
  { id: 11, item: 'Sushi Platter (12 pc)', status: 'preparing', minutesRemaining: 35 },
  { id: 12, item: 'Chocolate Lava Cake', status: 'delivered', minutesRemaining: 0 },
]
