const express = require("express");
const port = process.env.PORT || 3000;
const { handler } = require("./controller/index");
const app = express();

app.use(express.json());

// Root routes
app.post("/", async (req, res) => {
  console.log(req.body);
  res.send(await handler(req, "POST"));
});

app.get("/", async (req, res) => {
  res.send(await handler(req, "GET"));
});

// 404 handler for all other routes
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, function (err) {
  err ? console.log(err) : console.log(`Server listening on PORT: ${port}`);
});
