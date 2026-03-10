import { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import {
  getProjectsHandler,
  getProjectByIdHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from "../controllers/projectController";

const router = Router();

router.get(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
  getProjectsHandler
);

router.get(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead", "developer"] }),
  getProjectByIdHandler
);

router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead"] }),
  createProjectHandler
);

router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "lead"] }),
  updateProjectHandler
);

router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  deleteProjectHandler
);

export default router;