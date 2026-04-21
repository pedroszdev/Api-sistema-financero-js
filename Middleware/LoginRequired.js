import pkg from "jsonwebtoken";
const { verify, sign, decode } = pkg;
export default async function LoginRequired(req, res, next) {
  try {
    const token = req.token;
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    const decoded = verify(token, JWT_ACCESS_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido ou expirado", e });
  }
}
