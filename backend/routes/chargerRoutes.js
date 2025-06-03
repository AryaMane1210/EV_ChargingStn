import express from "express";
import { createCharger,getAllCharger,updateCharger,deleteCHarger } from "../controllers/chargerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/",createCharger);
router.get("/",getAllCharger);
router.put("/:id",updateCharger);
router.delete("/:id", deleteCHarger);

export default router;
