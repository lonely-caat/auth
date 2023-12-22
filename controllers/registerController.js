import { UsersRepository } from "../repositories/usersRepository.js";
import { AuthService } from "../services/authService.js";
import { registerSchema } from "../schemas/schemas.js";

export class AuthController {
    constructor() {
        this.usersRepository = new UsersRepository();
        this.authService = new AuthService();
    }

    registerUser = async (req, res, next) => {
        try {
            await registerSchema.validate(req.body);
        } catch (err) {
            return next(err);
        }

        const { username, password } = req.body;
        const hashedPassword = await this.authService.hashPassword(password, 10);

        try {
            const user = await this.usersRepository.addUser(username, hashedPassword);
            const token = this.authService.generateToken(user.id);

            res.status(201).json({ username, token });
        } catch (error) {
            if (error.code === 'DuplicateUsername') {
                return res.status(409).json({ message: "Username already exists" });
            }

            res.status(500).json({ message: "Error creating user" });
            next(error);
        }
    };
}
