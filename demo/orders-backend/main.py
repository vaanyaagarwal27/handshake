from fastapi import FastAPI
from data import ORDERS

app = FastAPI()

@app.get("/orders")
def get_orders():
    return ORDERS
