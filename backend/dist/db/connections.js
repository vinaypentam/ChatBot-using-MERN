import { connect, disconnect } from "mongoose";
async function connectToDb() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Unable to connect to database!!!");
    }
}
async function disconnectFromDb() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Unable to disconnect from database!!!");
    }
}
export { connectToDb, disconnectFromDb };
//# sourceMappingURL=connections.js.map