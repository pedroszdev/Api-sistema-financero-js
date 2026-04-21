import express from "express";
import sincronizarTabelas from "./Model/index.js";
import route from "./router.js";
import bearerToken from "express-bearer-token";

// sincronizarTabelas();

const server = express();
server.use(bearerToken());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(route);

server.listen(3000);
