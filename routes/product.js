import { Router } from "express";
import { fetchAllProducts, createProduct } from "../controllers/product";
import allowIfAdmin from "../middleware/allowIfAdmin";

const productRouter = Router();

productRouter.get("/", fetchAllProducts);
productRouter.post("/", allowIfAdmin, createProduct);

export default productRouter;
