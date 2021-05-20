import * as express from "express";
import { getVisitors, checkIn } from "../controllers/visitors";

const router = express.Router();

router.get("/visitors", getVisitors);

router.post("/check-in", checkIn);

export default router;
