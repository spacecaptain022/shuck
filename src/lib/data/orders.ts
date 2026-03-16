import { desc, eq } from "drizzle-orm";
import { db, orders, orderItems } from "@/lib/db";

export async function getOrderBySessionId(sessionId: string) {
  const order = await db.query.orders.findFirst({
    where: (o, { eq }) => eq(o.stripeCheckoutSessionId, sessionId),
  });
  if (!order) return null;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  return { ...order, items };
}

export async function getAllOrders() {
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: string) {
  const order = await db.query.orders.findFirst({
    where: (o, { eq }) => eq(o.id, id),
  });
  if (!order) return null;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return { ...order, items };
}
