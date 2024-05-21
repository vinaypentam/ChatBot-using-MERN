import axois from "axios"
export const loginUser = async(email: string, password: string)=>{
    const res = await axois.post("/user/login", {email, password});
    if(res.status !== 200){
         throw new Error("unable to login");
    };
    
    const data = await res.data;
    return data;
}
export const check_status = async()=>{
    const res = await axois.get("/user/auth-token");
    if(res.status !== 200){
         throw new Error("token is not matched");
    };
    
    const data = await res.data;
    return data;
}
export const sendChatRequest = async(message: string)=>{
    const res = await axois.post("/chat/new", {message});
    if(res.status !== 200){
         throw new Error("token is not matched");
    };
    
    const data = await res.data;
    return data;
}
export const fetchUserChats = async()=>{
    const res = await axois.get("/chat/userchats");
    if(res.status !== 200){
         throw new Error("token is not matched");
    };
    
    const data = await res.data;
    return data;
}
export const deleteUserChats = async()=>{
    const res = await axois.get("/chat/delete");
    if(res.status !== 200){
         throw new Error("Isssue while deleting the chats");
    }
    const data = await res.data;
    return data;
}
export const userLogout = async()=>{
    const res = await axois.get("/user/logout");
    if(res.status !== 200){
         throw new Error("Logout failed");
    }
    const data = await res.data;
    return data;
}
export const userSignUp = async(name: string, email: string, password: string)=>{
    const res = await axois.post("/user/signup",{ name, email, password});
    if(res.status !== 201){
         throw new Error("Signup failed");
    }
    const data = await res.data;
    return data;
}
