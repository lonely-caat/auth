import express from "express";
import { RegisterController } from "../controllers/registerController.js";

const router = express.Router();

const registerController = new RegisterController();

router.post("/register", registerController.registerUser);

router.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

export default router;
