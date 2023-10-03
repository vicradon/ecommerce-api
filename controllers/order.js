import prisma from "../prisma/client";

export async function fetchOrders() {
  return await prisma.order.findMany();
}

export async function createOrder(productId) {
  const product = await prisma.product.findFirst(productId);

  if (product === null) {
    throw new Error("order does not exist");
  }

  const order = await prisma.order.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      quantity: 1,
      product,
    },
  });
  return order;
}
