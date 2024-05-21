import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignUp, verifyUser } from "../controllers/user-controllers.js";
import { signupValidator, validator, loginValidator } from "../utils/validator.js";
import { verify_token } from "../utils/token_manager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validator(signupValidator), userSignUp);
userRouter.post("/login", validator(loginValidator), userLogin);
userRouter.get("/auth-token", verify_token, verifyUser);
userRouter.get("/logout", verify_token, userLogout);
export default userRouter;
//# sourceMappingURL=user-routes.js.map