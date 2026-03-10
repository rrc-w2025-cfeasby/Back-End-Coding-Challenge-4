console.log("ADMIN ROUTES LOADED");
import { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { setCustomClaimsHandler } from "../controllers/adminController";

const router = Router();

router.get("/debug", (req, res) => {
  res.send("Admin router is working");
})

router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaimsHandler
);

export default router;