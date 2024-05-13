import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
var cors = require("cors");
import fs from "fs";
import { json2csv } from "json-2-csv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server started");
});

app.post("/", (req: Request, res: Response) => {
  const jsonData = req.body;
  const csvData = json2csv(jsonData);

  const filePath = `${__dirname}/products.csv`;
  fs.writeFile(filePath, csvData, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.setHeader("Content-Disposition", 'attachment; filename="products.csv"');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending CSV file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting CSV file:", err);
        }
      });
    });
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
