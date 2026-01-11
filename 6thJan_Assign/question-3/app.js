import os from "os";
import fs from "fs";

console.log("----- OS Info -----");

// Free memory
console.log("Free Memory:", os.freemem(), "bytes");

// Total CPU cores
console.log("Total CPU Cores:", os.cpus().length);

// 1️ Create data.txt
fs.writeFile("data.txt", "Hello World", (err) => {
  if (err) return console.error("Error creating data.txt:", err);
  console.log("Created data.txt");

  // 2️ Create Readme.md
  fs.writeFile("Readme.md", "## This is first line in Readme", (err) => {
    if (err) return console.error("Error creating Readme.md:", err);
    console.log("Created Readme.md");

    // 3️ Read data.txt
    fs.readFile("data.txt", "utf-8", (err, data) => {
      if (err) return console.error("Error reading data.txt:", err);
      console.log("\ndata.txt content:\n", data);

      // 4️ Append second line to data.txt
      fs.appendFile("data.txt", "\nThis is second line", (err) => {
        if (err) return console.error("Error appending to data.txt:", err);
        console.log("Appended second line to data.txt");

        // 5️ Delete Readme.md
        fs.unlink("Readme.md", (err) => {
          if (err) return console.error("Error deleting Readme.md:", err);
          console.log("Deleted Readme.md");
        });
      });
    });
  });
});