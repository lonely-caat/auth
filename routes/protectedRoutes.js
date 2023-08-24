import express from "express";
import { ProtectedController } from "../controllers/protectedController.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js"

const router = express.Router();

const protectedController = new ProtectedController();

router.get("/protected",authenticateJWT, protectedController.getProtected);

router.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default router;
