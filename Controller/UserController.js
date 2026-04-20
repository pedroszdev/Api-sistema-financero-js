import { where } from "sequelize";
import UserModel from "../Model/UserModel.js";
export async function IndexCadastro(req, res) {
  return res.render("cadastro");
}

export async function CadastroUser(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (nome.length <= 2) {
      const erros = "Seu nome precisa ter pelo menos 3 caractere";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/user");
      });
      return;
    }

    const VerificarSeEmailExiste = await UserModel.findOne({
      where: { email },
    });
    if (VerificarSeEmailExiste) {
      const erros = "Já existe uma conta com esse email";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/user");
      });
      return;
    }

    if (senha.length <= 6) {
      const erros = "Sua senha precisa ter 7 ou mais caractere";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/user");
      });
      return;
    }

    const user = await UserModel.create({ nome, email, senha });
    req.flash("success", "Usuário criado com sucesso");
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  } catch (e) {
    req.flash("error", `Error: ${e}`);
    req.session.save(() => {
      res.redirect("/");
    });
    return;
  }
}

export async function EditarUserIndex(req, res) {
  const { id } = req.params;
  if (id != req.session.usuario.id) {
    return res.send("ERROR 404");
  }
  const user = await UserModel.findOne({
    where: { id },
    raw: true,
    nest: true,
  });
  return res.render("atualizarConta", { user });
}

export async function EditarUser(req, res) {
  const { nome, email } = req.body;
  const id = req.session.usuario.id;
  if (nome.length <= 2) {
    const erros = "Seu nome precisa ter pelo menos 3 caractere";
    req.flash("error", erros);
    req.session.save(() => {
      res.redirect("/user/" + id);
    });
    return;
  }

  const VerificarSeEmailExiste = await UserModel.findOne({
    where: { email },
    raw: true,
    nest: true,
  });
  const user = await UserModel.findOne({
    where: { id },
    raw: true,
    nest: true,
  });
  if (VerificarSeEmailExiste && VerificarSeEmailExiste.email != user.email) {
    const erros = "Já existe uma conta com esse email";
    req.flash("error", erros);
    req.session.save(() => {
      res.redirect("/user/" + id);
    });
    return;
  }
  await UserModel.update(req.body, { where: { id } });
  req.flash("success", "Usuário alterado com sucesso");
  req.session.save(() => {
    res.redirect("/");
  });
  return;
}
export async function ApagarUser(req, res) {
  const id = parseInt(req.params.id);
  const idUser = req.session.usuario.id;
  try {
    if ((id = idUser)) {
      const user = await UserModel.destroy({ where: { id } });
      req.flash("success", "Usuario apagado com sucesso");
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
  } catch (e) {
    req.flash("error", `Error: ${e}`);
    req.session.save(() => {
      res.redirect("/");
    });
    return;
  }
}
