import express from "express";
const server = express();
import sincronizarTabelas from "./Model/index.js";
import route from "./router.js";
import session from "express-session";
import flash from "connect-flash";

// sincronizarTabelas();

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  }),
);
server.use(flash());
server.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

server.set("views", "./View");
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static("public"));
server.use(route);

server.listen(3000);
