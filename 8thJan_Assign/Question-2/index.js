import express from "express";
import os from "os";
import dns from "dns";
import { readDataFile } from "./read.js";

const app = express();
const PORT = 3000;

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", (req, res) => {
  readDataFile((err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

app.get("/systemdetails", (req, res) => {
  const details = {
    platform: os.platform(),
    totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB",
    freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + " GB",
    cpuModel: os.cpus()[0].model
  };
  
  res.json(details);
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", (err, address) => {
    if (err) {
      res.status(500).json({ error: "DNS lookup failed" });
      return;
    }
    res.json({
      hostname: "masaischool.com",
      ipAddress: address
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
