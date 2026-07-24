import { analyzeWebsite } from "../Services/analyzewebsite.service.js";
import { apiResponse } from "../Utils/apiResponse.js";
import { apiError } from "../Utils/apiError.js";
export const webSiteAnalyzer=async(req,res)=>{
    console.log("Controller hit");
    try {
        const url=req.body.url;
        const report=await analyzeWebsite(url);
    
        return res.status(200).json(
            new apiResponse(200,report)
        )
    } catch (error) {
        if(error.status==304){
            throw new apiError(304,`${error.message}`);
        }
        throw new apiError(401,`${error.message}`);
    }

}