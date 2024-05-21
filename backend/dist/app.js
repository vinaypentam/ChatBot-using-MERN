import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { appRoute } from "./routes/index.js";
config();
const app = express();
//middlewares
app.use(express.json);
app.use(morgan("dev"));
app.use('/api/v1', appRoute);
export default app;
//# sourceMappingURL=app.js.map