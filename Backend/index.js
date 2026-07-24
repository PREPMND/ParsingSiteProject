import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})
console.log("ok")
import { application } from "./app.js";
console.log("ok1")
const PORT= process.env.PORT || 3000;
application.get("/send", (req, res) => {
    res.send("Working hehe");
});
application.listen(PORT,()=>{
    console.log("Server is running on ", PORT);
})
