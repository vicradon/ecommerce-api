import prisma from "../prisma/client";

export async function createProduct(name, description) {
  const product = await prisma.product.create({
    data: {
      name,
      description,
    },
  });
  return product;
}

export async function getAllProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export async function updateProduct(productId, name, description) {
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description,
    },
  });
  return updatedProduct;
}

export async function deleteProduct(productId) {
  const deletedProduct = await prisma.product.delete({
    where: { id: productId },
  });
  return deletedProduct;
}
