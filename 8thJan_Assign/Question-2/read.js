import fs from "fs";

export function readDataFile(callback) {
  fs.readFile("Data.txt", "utf-8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
}
