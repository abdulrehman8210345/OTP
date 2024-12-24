import express from "express"
import { postOtp } from "./controller/opt.js";
import cors from "cors"

const app = express();


app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use("/api/post",postOtp)


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});