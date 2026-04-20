import express from "express";
const route = express.Router();
import HomeController from "./Controller/HomeController.js";
import { homeTransacoes } from "./Controller/TransacoesController.js";
import {
  HomeProduto,
  CadastrarTransacao,
  EditIndex,
  EditarTransacao,
  ApagarTransacao,
} from "./Controller/TransacaoController.js";
import {
  IndexCadastro,
  CadastroUser,
  EditarUserIndex,
  EditarUser,
  ApagarUser,
} from "./Controller/UserController.js";
import { LoginUser, LoginIndex, Logout } from "./Controller/LoginController.js";
import LoginRequired from "./Middleware/LoginRequired.js";
//Home
route.get("/", LoginRequired, HomeController);

//ListaTransacoes
route.get("/transacoes", LoginRequired, homeTransacoes);

//CRUD transacao
route.get("/transacao", LoginRequired, HomeProduto);
route.post("/transacao", LoginRequired, CadastrarTransacao);
route.get("/transacao/:id", LoginRequired, EditIndex);
route.post("/transacao/edit/:id", LoginRequired, EditarTransacao);
route.delete("/transacao/delete/:id", LoginRequired, ApagarTransacao);

//CRUD User
route.get("/user", IndexCadastro);
route.post("/user", CadastroUser);
route.get("/user/:id", LoginRequired, EditarUserIndex);
route.post("/user/:id", LoginRequired, EditarUser);
route.delete("/user/delete/:id", LoginRequired, ApagarUser);

//LoginUser
route.get("/login", LoginIndex);
route.post("/login", LoginUser);
route.get("/logout", LoginRequired, Logout);

export default route;
