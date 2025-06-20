const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5100;

// ✅ Enable CORS for all routes
app.use(
  cors({
    origin: "*", // 👈 allow your frontend
    methods: "*",
    allowedHeaders: "*",
  }),
);

app.post("/upload", (req, res) => {
  const filename = decodeURIComponent(req.headers["x-filename"] || "unknown");
  const saveTo = path.join(__dirname, "uploads", filename);

  let bytesReceived = 0;
  const fileStream = fs.createWriteStream(saveTo);

  req.on("data", (chunk) => {
    bytesReceived += chunk.length;
    console.log(`Received ${bytesReceived} bytes`);
  });

  req.pipe(fileStream);

  req.on("end", () => {
    console.log("Upload complete");
    fs.rmSync(saveTo); // Cleanup
    res.send("File uploaded successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
