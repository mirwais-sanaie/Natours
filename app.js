const express = require("express");
const morgan = require("morgan");
const connectDB = require("./dev-data/data/import-dev-data");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/apiError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json());

connectDB();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//my own
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

//

//route to access .html .img .css or ...
app.use(express.static(`${__dirname}/public`));
// app middlewares
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
