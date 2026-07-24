import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";


const application = express();

application.use(
    cors({
        origin: true,
        credentials: true,
    })
);
console.log("middle")
application.use(express.json({ limit: "16kb" }))
application.use(express.urlencoded({ extended: true, limit: "16kb" }))
application.use(express.static("public"))
application.use(cookieParser())


import router from './Routes/route.js'
console.log("router")
application.use("/api/v1", router)
router.get("/ping", (req, res) => {
    res.send("pong");
});
// Global error handler
application.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        statusCode: status,
        data: err.data || null,
        message: err.message || "Internal Server Error",
        success: false,
        errors: err.errors || []
    });
});

export { application }


//taskkill //F //IM node.exe