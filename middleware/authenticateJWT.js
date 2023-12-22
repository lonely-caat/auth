import { AuthService } from "../services/authService.js";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers['auth'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('Authorization header is missing');
  }

  const authService = new AuthService();
  try {
    const user = authService.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json('please provide valid token');
  }
}
