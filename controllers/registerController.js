import bcrypt from 'bcrypt';
import { RegisterRepository } from "../repositories/registerRepository.js";

export class RegisterController {
    constructor() {
        this.registerRepository = new RegisterRepository();
    }

    registerUser = async (req, res, next) => {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await this.registerRepository.addUser(username, hashedPassword);

            const token = this.registerRepository.generateToken(username);
            res.status(201).json({ username, token });
        } catch (error) {
            res.status(400).json({ message: "Error creating user" });
            next(error);
        }
    };
}
