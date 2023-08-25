import { RegisterRepository } from "../repositories/registerRepository.js";
import { AuthService } from "../services/authService.js";
import { registerSchema } from "../helpers/schemas.js"

export class RegisterController {
    constructor() {
        this.registerRepository = new RegisterRepository();
        this.authService = new AuthService();
    }

    registerUser = async (req, res, next) => {

        try {
            await registerSchema.validate(req.body)

        } catch (err) {
            return next(err);
        }

        const { username, password } = req.body;

        const hashedPassword = await this.authService.hashPassword(password, 10);

        try {
            await this.registerRepository.addUser(username, hashedPassword);

            const token = this.authService.generateToken(username);
            res.status(201).json({ username, token });
        } catch (error) {
            res.status(500).json({ message: "Error creating user" });
            next(error);
        }
    };
}
