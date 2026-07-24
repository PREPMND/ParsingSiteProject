import { apiError } from "../Utils/apiError.js";

export const checkURLValidation=(req,res,next)=>{
    const url=req.body.url;
    if(!url){
        throw new apiError(400,"URL is required to analyze website.");
    }
    try{
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new Error();
        }
        next();
    }catch {
        throw new apiError(400,"Please enter a valid HTTP:/HTTPS: URL");
    }
}