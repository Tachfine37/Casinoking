import { pgTable, text, boolean, uuid, numeric, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const affiliatesTable = pgTable("affiliates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logo: text("logo"),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  bonus: text("bonus"),
  description: text("description"),
  link: text("link"),
  badge: text("badge"),
  position: integer("position").default(0),
  active: boolean("active").default(true),
});

export const insertAffiliateSchema = createInsertSchema(affiliatesTable).omit({ id: true });
export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliatesTable.$inferSelect;
