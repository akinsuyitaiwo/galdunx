import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "../config/database"
import { CustomRequest } from "../utilities/interface";
import router from "../routes/index";

const port = process.env.PORT

declare global {
	namespace Express {
		interface Request extends CustomRequest { }
	}
  }

export const server = () => {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json({ limit: "50mb" }));
  server.use(express.json({ limit: "50mb" }));
  server.use(express.urlencoded({ extended: false, limit: "50mb" }));

  server.use("/api/v1", router);


  server.get("/", (req, res) => {
    res.status(200).send({ success: true, message: "API homepage" });
  });

  server.use((req, res) => {
    res.status(404).send({ success: false, message: "Invalid route" });
  });

  server.listen(port, async()=>{
    await db.connect()
    console.log(`Server is running on port ${port}`)
});

};
