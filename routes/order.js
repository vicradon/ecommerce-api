import { Router } from "express";
import { fetchOrders, createOrder } from "../controllers/order";

const orderRouter = Router();

orderRouter.get("/", fetchOrders);
orderRouter.post("/", createOrder);

export default orderRouter;
