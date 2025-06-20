const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5100;

// Allow client to connect from different origin
app.use(cors());

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a "ping" event every second
  const intervalId = setInterval(() => {
    const data = { time: new Date().toISOString() };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);

  // Close connection on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});
