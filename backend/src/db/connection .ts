import {connect, disconnect} from "mongoose";

const DBURL = process.env.MONGODB_URL;

async function connectToDb(){
    try {
        await connect("mongodb://0.0.0.0:27017/mydata");
    } catch (error) {
        console.log("Unable to connect to database");
        console.log(error);
    }
}
async function disconnectToDb(){
    try {
        await disconnect();
    } catch (error) {
        throw new Error("Unable to disconnect from database");
    }
}

export {connectToDb, disconnectToDb};