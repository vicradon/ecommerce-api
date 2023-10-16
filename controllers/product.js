import prisma from "../prisma/client";

// admin level
export async function createProduct(req, res) {
  const { name, description } = req.body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
    },
  });
  return res.status(201).json({
    message: "Created product successfully",
    product,
  });
}

// all users
export async function fetchAllProducts(req, res) {
  const products = await prisma.product.findMany();

  return res.status(200).json({
    message: "Fetched products successfully",
    products,
  });
}

// admin level
export async function updateProduct(req, res, next) {
  const { productId, name, description } = req.body;
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
    },
  });

  return res.status(200).json({
    message: "Updated product successfully",
    product: updatedProduct,
  });
}

// admin level
export async function deleteProduct(productId) {
  await prisma.product.delete({
    where: { id: productId },
  });

  return res.status(200).json({
    message: "Deleted product successfully",
  });
}
