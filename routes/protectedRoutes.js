import express from 'express';
import { ProtectedController } from '../controllers/protectedController.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';

const router = express.Router();

router.get("/protected", authenticateJWT, ProtectedController.getProtected);

router.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default router;
