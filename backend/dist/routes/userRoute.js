import { Router } from "express";
import { getAllUsers } from "../controllers/user-controls.js";
const userRoute = Router();
userRoute.use('/', getAllUsers);
export { userRoute };
//# sourceMappingURL=userRoute.js.map