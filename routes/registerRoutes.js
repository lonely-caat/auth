import express from "express";
import { AuthController } from "../controllers/AuthController.js";

const router = express.Router();

const AuthController = new AuthController();

router.post("/register", AuthController.registerUser);

router.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

export default router;
