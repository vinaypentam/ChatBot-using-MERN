import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const create_token = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verify_token = (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "")
        return res.status(401).send("Token not received");
    console.log(token);
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).send("Invalid token");
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token_manager.js.map