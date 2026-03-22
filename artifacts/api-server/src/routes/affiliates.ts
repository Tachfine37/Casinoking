import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { affiliatesTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/affiliates", async (req, res) => {
  try {
    const affiliates = await db
      .select()
      .from(affiliatesTable)
      .where(eq(affiliatesTable.active, true))
      .orderBy(asc(affiliatesTable.position));

    res.json({
      affiliates: affiliates.map(a => ({
        ...a,
        rating: a.rating !== null ? Number(a.rating) : null,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching affiliates");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
