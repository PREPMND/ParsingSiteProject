import {Router} from "express"
import { webSiteAnalyzer } from "../Controllers/controller.js";
import { checkURLValidation } from "../Middlewares/checkURL.js";
const router = Router();
console.log("router2")
router.route("/analyzewebsite").post(checkURLValidation,webSiteAnalyzer)

export default router