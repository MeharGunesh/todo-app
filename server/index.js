import express from "express";
import router from "./routes/user-route.js";
import list from "./routes/list-routes.js"
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", router)
app.use("/api/list", list)


mongoose.connect("mongodb+srv://todoapp:todoapp123@cluster0.4lcoefy.mongodb.net/?retryWrites=true&w=majority")
// mongoose.connect("mongodb://localhost:27017")


.then(()=>{
    app.listen(7001,()=>{
        console.log("server startred")
        console.log("mongoDB cloud is conected")
    })
    
}).catch((err)=>{
    console.log("error conecting mongodb",err)

})





