import * as express from "express";
import visitors from "./routes/visitors";
/**
 * The creation of app is separated from the entry-point so tests can't throw EADDRINUSE = Port is already listening.
 * This error is otherwise thrown the whole time, because every time the app.listen() is called.
 */
const app = express();
app.use(express.json());
app.use("/", visitors);

export default app;
