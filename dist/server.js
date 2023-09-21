// server/server.ts
import { join } from "node:path";
import express from "express";
import request from "superagent";
import * as Path from "node:path";
import * as URL from "node:url";
import * as dotenv from "dotenv";
dotenv.config();
var apiKey = process.env.SPACE_KEY;
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var server = express();
server.use(express.json());
server.use(express.static(join(__dirname, "./public")));
server.get("/api/v1/space", async (req, res) => {
  const response = await request.get(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2023-08-20&end_date=2023-09-20`
  );
  res.json(response.body);
});
var server_default = server;

// server/index.ts
var port = process.env.PORT || 3e3;
server_default.listen(port, function() {
  console.log("Listening on port", port);
});
