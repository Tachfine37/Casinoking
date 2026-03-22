import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { articlesTable } from "@workspace/db/schema";
import { eq, and, count, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/articles", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const category = req.query.category as string | undefined;
    const featured = req.query.featured === "true" ? true : req.query.featured === "false" ? false : undefined;

    const offset = (page - 1) * limit;

    const conditions = [eq(articlesTable.published, true)];
    if (category) conditions.push(eq(articlesTable.category, category));
    if (featured !== undefined) conditions.push(eq(articlesTable.featured, featured));

    const whereClause = and(...conditions);

    const [totalResult, articles] = await Promise.all([
      db.select({ count: count() }).from(articlesTable).where(whereClause),
      db
        .select()
        .from(articlesTable)
        .where(whereClause)
        .orderBy(desc(articlesTable.createdAt))
        .limit(limit)
        .offset(offset),
    ]);

    const total = Number(totalResult[0]?.count ?? 0);

    res.json({
      articles: articles.map(a => ({
        ...a,
        rating: a.rating !== null ? Number(a.rating) : null,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching articles");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/articles/slugs/all", async (req, res) => {
  try {
    const rows = await db
      .select({ slug: articlesTable.slug })
      .from(articlesTable)
      .where(eq(articlesTable.published, true));

    res.json({ slugs: rows.map(r => r.slug) });
  } catch (err) {
    req.log.error({ err }, "Error fetching slugs");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/articles/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [article] = await db
      .select()
      .from(articlesTable)
      .where(and(eq(articlesTable.slug, slug), eq(articlesTable.published, true)))
      .limit(1);

    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    res.json(article);
  } catch (err) {
    req.log.error({ err }, "Error fetching article");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const rows = await db
      .select({ category: articlesTable.category, count: count() })
      .from(articlesTable)
      .where(and(eq(articlesTable.published, true)))
      .groupBy(articlesTable.category);

    const categories = rows
      .filter(r => r.category !== null)
      .map(r => ({ category: r.category as string, count: Number(r.count) }));

    res.json({ categories });
  } catch (err) {
    req.log.error({ err }, "Error fetching categories");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
