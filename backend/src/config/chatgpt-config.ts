import { Configuration } from "openai";

function chatgpt_configuration(){
    const config = new Configuration(
        {
            apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPEN_AI_ORG_KEY,
        }
    )
    return config;
}

export default chatgpt_configuration;