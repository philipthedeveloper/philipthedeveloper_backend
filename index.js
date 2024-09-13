import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendNewMessage, getBaseRoute } from "./controllers/general.js";
import {
  errorHandler,
  methodChecker,
  requestLogger,
  routeNotFound,
} from "./middlewares/index.js";

dotenv.config();

// Initialize an express app
const app = express();

// Env variables
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(methodChecker); // Checks if the incoming request method is supported
app.use(express.urlencoded({ extended: true })); // Parse urlencoded data in request body
app.use(express.json({})); // Parse json data in request body

app.use(requestLogger); // Log any incoming request to the console

app.get("/", getBaseRoute);
app.post("/", sendNewMessage);

// All route that are not handled from the top will be handled here
app.all("*", routeNotFound); // Returns a 404 response for such routes
app.use(errorHandler); // Handles all error in the app

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
