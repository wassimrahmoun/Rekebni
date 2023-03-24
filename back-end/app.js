const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const trajetRouter = require("./routes/trajetRoutes");
const cookieParser = require("cookie-parser");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" })); //read data into res.body
app.use(express.urlencoded({ extended: true, limit: "10kb" })); //
app.use(cookieParser()); //

//teste middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trajets", trajetRouter);
// if we cherche /API/mehdii ou qlq chose qui nexiste pas on vous donne une err vadalnle poour comprendre
app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this serv`, 404));
});
// app.use(globalErrorHandler);

module.exports = app;
