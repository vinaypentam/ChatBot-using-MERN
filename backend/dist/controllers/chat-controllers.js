import User from "../models/userModel.js";
export const generateChatCompeletion = async (req, res) => {
    try {
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send({ error: "user not found" });
        console.log(user.name);
        const chats = user.chats.map(({ role, content }) => ({
            role, content
        }));
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        console.log(message);
        // const config = chatgpt_configuration();
        // const openai = new OpenAIApi(config);
        // const chat_response = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: [{role: "system", content:message}]
        // })
        // user.chats.push(chat_response.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Facing issues while generating chat response" });
    }
};
export const fetchUserChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "No user found" });
        return res.status(200).json({ message: "ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "error" });
    }
};
export const deleteChats = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "No user found" });
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "ok" });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "error" });
    }
};
//# sourceMappingURL=chat-controllers.js.map