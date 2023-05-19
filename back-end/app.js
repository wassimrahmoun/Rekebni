const express = require("express");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
// const hpp = require("hpp");
const compression = require("compression");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const trajetRouter = require("./routes/trajetRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

//security HTTP headers

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "unpkg.com"],
      styleSrc: ["'self'", "cdnjs.cloudflare.com"],
      // fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Too many requiestes from this iP, please try again in an hour§",
});

app.use("/api", limiter); //block juste /api

app.use(express.json({ limit: "10kb" })); //read data into res.body
app.use(express.urlencoded({ extended: true, limit: "10kb" })); //
app.use(cookieParser()); //

//data sanitaization sgainst Nosql query injection
app.use(mongoSanitize()); //get off all $ and bizzaers caracterres

//teste middleware
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use(express.json());
// app.use(express.static(path.join(__dirname, "public/css")));

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trajets", trajetRouter);
app.use("/api/v1/reviews", reviewRouter);

app.get("/", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "index.html");
  res.sendFile(filePath);
});
app.get("/login", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "login.html");
  res.sendFile(filePath);
});
app.get("/signup", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "signup.html");
  res.sendFile(filePath);
});
app.get("/recherche", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "rech.html");
  res.sendFile(filePath);
});
app.get("/publier", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "addTrip.html");
  res.sendFile(filePath);
});
app.get("/details", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "details.html");
  res.sendFile(filePath);
});
app.get("/Moncompte", function (req, res) {
  const filePath = path.join(__dirname, "public", "html", "dashboard.html");
  res.sendFile(filePath);
});
// if we cherche /API/mehdii ou qlq chose qui nexiste pas on vous donne une err vadalnle poour comprendre
// app.all("*", (req, res, next) => {
//   next(new AppError(`cant find ${req.originalUrl} on this serv`, 404));
// });
// app.use(globalErrorHandler);

module.exports = app;
