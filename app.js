// give access to .env variables
require("dotenv").config();

// async errors
require("express-async-errors");
const path = require("path");

// express
const express = require("express");
const cors = require('cors');
const app = express();

// connect database
const connectDB = require("./db/connect");
const productsRouter = require("./routes/routesProducts");

// products route
app.use("/api/v1/products", productsRouter);

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(cors());

// routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3003;

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
