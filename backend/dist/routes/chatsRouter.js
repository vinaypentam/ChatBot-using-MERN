import { Router } from "express";
import { verify_token } from "../utils/token_manager.js";
import { messageValidator, validator } from "../utils/validator.js";
import { deleteChats, fetchUserChats, generateChatCompeletion } from "../controllers/chat-controllers.js";
const chatsRouter = Router();
chatsRouter.post("/new", validator(messageValidator), verify_token, generateChatCompeletion);
chatsRouter.get("/userchats", verify_token, fetchUserChats);
chatsRouter.get("/delete", verify_token, deleteChats);
export default chatsRouter;
//# sourceMappingURL=chatsRouter.js.map