import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import 'dotenv/config'


const SECRET_KEY = process.env.SECRET_KEY; // move  this to gh secrets or something

export class AuthService{
  async hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
  }
  generateToken(username) {
    const token = jwt.sign({ username: username }, SECRET_KEY, {
      expiresIn: '31d'
    });
    return token;
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
}


