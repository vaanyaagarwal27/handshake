from datetime import datetime, timedelta, timezone

IST = timezone(timedelta(hours=5, minutes=30))

# ETAs are computed when the server starts, relative to "now" in IST,
# so the demo always shows realistic times. Restart uvicorn to refresh them.
NOW = datetime.now(IST)


def at(minutes):
    return (NOW + timedelta(minutes=minutes)).isoformat(timespec="seconds")


ORDERS = [
    {
        "id": 1,
        "item": "Paneer Butter Masala",
        "status": "delivered",
        "eta": at(-20),
    },
    {
        "id": 2,
        "item": "Chicken Biryani",
        "status": "on the way",
        "eta": at(4),
    },
    {
        "id": 3,
        "item": "Masala Dosa",
        "status": "preparing",
        "eta": at(12),
    },
    {
        "id": 4,
        "item": "Veg Burger",
        "status": "preparing",
        "eta": at(22),
    },
    {
        "id": 5,
        "item": "Mango Lassi",
        "status": "on the way",
        "eta": at(9),
    },
    {
        "id": 6,
        "item": "Chole Bhature",
        "status": "delivered",
        "eta": at(-35),
    },
    {
        "id": 7,
        "item": "Butter Naan",
        "status": "preparing",
        "eta": at(33),
    },
    {
        "id": 8,
        "item": "Aloo Paratha",
        "status": "on the way",
        "eta": at(17),
    },
    {
        "id": 9,
        "item": "Idli Sambar",
        "status": "delivered",
        "eta": at(-15),
    },
    {
        "id": 10,
        "item": "Pav Bhaji",
        "status": "preparing",
        "eta": at(41),
    },
    {
        "id": 11,
        "item": "Dal Makhani",
        "status": "on the way",
        "eta": at(28),
    },
    {
        "id": 12,
        "item": "Gulab Jamun",
        "status": "delivered",
        "eta": at(-45),
    },
]