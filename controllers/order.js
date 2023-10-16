import prisma from "../prisma/client";

// per user
export async function fetchOrders(req, res, next) {
  const { userId } = req.params;
  const orders = await prisma.order.findMany({ where: userId });

  return res.status(200).json({
    message: "Fetched orders successfully",
    orders,
  });
}

// all users
export async function createOrder(req, res, next) {
  try {
    const { productId, userId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (product === null) {
      throw new Error("Product does not exist");
    }

    if (user === null) {
      throw new Error("User not found");
    }

    const order = await prisma.order.create({
      data: {
        quantity,
        product: {
          connect: {
            id: product.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.status(200).json({
      message: "Created order successfully",
      order,
    });
  } catch (error) {
    next(error);
  } finally {
    await prisma.$disconnect();
  }
}
