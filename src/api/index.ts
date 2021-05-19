const express = require("express");

const app = new express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () =>
  console.log(`Hello world app listening on port http://localhost:${port}!`)
);
