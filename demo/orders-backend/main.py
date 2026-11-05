from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import ORDERS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/orders")
def get_orders(page: int = 1, limit: int = 10):
    total = len(ORDERS)
    start = (page - 1) * limit
    end = start + limit
    return {
        "orders": ORDERS[start:end],
        "page": page,
        "limit": limit,
        "total": total,
    }
