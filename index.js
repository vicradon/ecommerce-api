import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { createOrder } from "./controllers/order";
import { createProduct, getAllProducts } from "./controllers/product";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("It works!");
});

app.use("/api/v1/auth", authRouter);

app.post("/orders", async (req, res) => {
  const result = createOrder(5);
  res.send(result);
});

app.post("/products", async (req, res) => {
  const result = await createProduct("Mattres", "2x2 mattress for sleeping");
  res.send(result);
});

app.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port :${PORT}`);
});
