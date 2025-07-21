import express from "express"
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute";
import connectDB from "./src/config/mongodb";
import connetcCloudinary from "./src/config/cloudinary";
import albumRouter from "./src/routes/albumRoute";


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connetcCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//initializing routes
app.use("/api/song",songRouter);
app.use("/api/album", albumRouter);
app.get("/", (req, res) => res.send("api working"));
app.listen(port, () =>console.log(`server started on ${port}`));
