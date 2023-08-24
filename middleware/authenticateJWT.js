import { RegisterRepository } from "../repositories/registerRepository.js";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers['auth'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('please provide token');
  }

  const registerRepository = new RegisterRepository();
  try {
    const user = registerRepository.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json('please provide valid token');
  }
}
