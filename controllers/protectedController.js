import { ProtectedRepository } from "../repositories/protectedRepository.js";

export class ProtectedController {
  constructor() {
    this.protectedRepository = new ProtectedRepository();
  }

  getProtected = async (req, res, next) => {
    console.log("getProtected");

    try {
      if (!req.headers.authorization) {
        return res.status(400).json({ message: "AuthorizationHeaderMissing" });
      }

      const response = await this.protectedRepository.getProtected();
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ message: "UnauthorizedAccess" });
      next(error);
    }
  };
}
