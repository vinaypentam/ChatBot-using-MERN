import express from "express";
import { config } from "dotenv";
import { connectToDb } from "./db/connection .js";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
connectToDb().then(() => {
    app.listen(PORT, () => console.log("Connected to database & Server started on port.no", PORT));
}); //.catch(()=>console.log("Problem while connecting to server"))
//# sourceMappingURL=index.js.map