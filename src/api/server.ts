import * as express from "express";
import visitors from "./routes/visitors";

const app = express();
app.use(express.json());
app.use("/api", visitors);

const port = 3000;

app.listen(port, () =>
  console.log(`Hello world app listening on port http://localhost:${port}`)
);
