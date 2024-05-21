import { body, validationResult } from "express-validator";
export const validator = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result)
                break;
        }
        const error = validationResult(req);
        if (error.isEmpty())
            return next();
        return res.status(422).json({ error: error.array() });
    };
};
export const loginValidator = [
    body("password").trim().isLength({ min: 7 }).withMessage("Password must contain atleast 6 letters"),
    body("email").isEmail().withMessage("Enter valid email")
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("password").notEmpty().trim().isLength({ min: 7 }).withMessage("Password must contain atleast 6 letters"),
    body("email").isEmail().withMessage("Enter valid email")
];
export const messageValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validator.js.map