import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as productsSchema from "./schema/products";
import * as ordersSchema from "./schema/orders";
import * as marketingSchema from "./schema/marketing";
import * as enumsSchema from "./schema/enums";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, {
  schema: {
    ...productsSchema,
    ...ordersSchema,
    ...marketingSchema,
    ...enumsSchema,
  },
});

export * from "./schema/products";
export * from "./schema/orders";
export * from "./schema/marketing";
export * from "./schema/enums";
