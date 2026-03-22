import { Router, type IRouter } from "express";
import healthRouter from "./health";
import articlesRouter from "./articles";
import affiliatesRouter from "./affiliates";

const router: IRouter = Router();

router.use(healthRouter);
router.use(articlesRouter);
router.use(affiliatesRouter);

export default router;
