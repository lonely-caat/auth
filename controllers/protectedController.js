export class ProtectedController {
  static getProtected = async (req, res, next) => {
    console.log("getProtected");
    try {
      if (!req.headers.authorization) {
        return res.status(400).json({ message: "AuthorizationHeaderMissing" });
      }

      const response = { secret: 'value' };
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json({ message: "UnauthorizedAccess" });
      next(error);
    }
  };
}
