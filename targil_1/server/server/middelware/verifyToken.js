
import jwt  from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  try {
    console.log("verifyToken");
    const token=req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(403).send("אנא התחבר שנית-התז או הסיסמא שגויים");
    }

    const decoded = jwt.verify(token, "dsdddder");
    req.user = decoded;
    console.log(req.originalUrl);
    console.log(req.baseUrl);

  } catch (err) {
    console.log("auth was not succeed");
    return res.status(401).send("אנא התחבר שנית-התז או הסיסמא שגויים");;
  }
  console.log("auth succeed");
  return next();
};

export default  verifyToken;