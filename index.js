import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import orderRouter from "./routes/order";
import productRouter from "./routes/product";
import allowIfLoggedin from "./middleware/allowIfLoggedIn";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("It works!");
});

app.use("/api/v1/auth", authRouter);

app.use(allowIfLoggedin);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port :${PORT}`);
});
