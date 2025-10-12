import express from "express";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";
import router from "./routes/login.routes.js";
import { jwtVerify } from "./middleware/jwt.middleware.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.set("view engine", "ejs");
//Best Practices securities express : https://expressjs.com/en/advanced/best-practice-security.html
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by");

app.use(jwtVerify);
app.use(router);
//not found handler 
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(PORT, () => {
  console.log(`Server is listen on port ${PORT}`);
});
