import { ProtectedRepository } from "../repositories/protectedRepository.js";

export class ProtectedController {
  constructor() {
    this.protectedRepository = new ProtectedRepository();
  }

  getProtected = async (req, res, next) => {
    console.log("getProtected")

    try {
      const response = await this.protectedRepository.getProtected();
      res.status(666).json(response);
    } catch (error) {
      res.status(401).json({ message: "please send auth headers" });
      next(error);
    }
  };
}
