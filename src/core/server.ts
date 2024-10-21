import express, { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "../config/database"

const port = process.env.PORT

export const server = () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));

  app.get("/", (req, res) => {
    res.status(200).send({ success: true, message: "API homepage" });
  });

//   app.use("api/v1", router);

  app.use((req, res) => {
    res.status(404).send({ success: false, message: "Invalid route" });
  });

  app.listen(port, async()=>{
    await db.connect()
    console.log(`Server is running on port ${port}`)
});

};
