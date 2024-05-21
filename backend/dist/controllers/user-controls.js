import user from "../models/userSchema.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        return res.send("hello");
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=user-controls.js.map