import axios from "axios";
import * as cheerio from "cheerio";
import { apiError } from "../Utils/apiError.js";
import { apiResponse } from "../Utils/apiResponse.js";
//Will implement all the business logic here. 
export const analyzeWebsite = async (url) => {
    const start = Date.now();
    try {
        const response = await axios.get(url, {
            timeout: 10000,
            maxRedirects: 5,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Accept: "text/html",
            },
        });

        const responseTime = `${Date.now() - start} ms`;
        const contentType = response.headers["content-type"] || "";
        if (!contentType.includes("text/html")) {
            throw new apiError("Only HTML pages are supported.");
        }
        const $ = cheerio.load(response.data);
        const title = $("title").text().trim();
        const description =
            $('meta[name="description"]').attr("content")?.trim() || "";
        const h1 = $("h1").first().text().trim();
        const missingAlt = $("img").filter((_, img) => {
            return !$(img).attr("alt");
        }).length;

        const wordCount = $("body")
            .text()
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(Boolean).length;

        return {
                status: response.status,
                responseTime,
                title,
                description,
                h1,
                missingAlt,
                wordCount,
                html:response.data
            }
        
    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new apiError(500,"Request timed out.U can try again");
        }
        if (error.response) {
            throw new apiError(
                401,
                `Website responded with status ${error.response.status}.
                Please try with other websites.`
            );
        }

        throw new apiError(401, "The reuqest has been declined");
    }
};