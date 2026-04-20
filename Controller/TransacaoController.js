import Transacao from "../Model/TransacaoModel.js";
import Categoria from "../Model/CategoriaModel.js";

export async function HomeProduto(req, res) {
  const categoria = await Categoria.findAll({ raw: true, nest: true });
  return res.render("novaTransacao", { categoria });
}

export async function CadastrarTransacao(req, res) {
  try {
    if (isNaN(valor) || valor <= 0) {
      const erros = "Valor deve ser um número e maior que 0";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/transacao");
      });
      return;
    }
    if (req.body.descricao.length <= 2) {
      const erros = "Descrição deve ter 2 ou mais caractere";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/transacao");
      });
      return;
    }
    req.body.userId = req.session.usuario.id;
    const transacao = await Transacao.create(req.body);
    req.flash("success", "Transação criada com sucesso");
    req.session.save(() => {
      res.redirect("/");
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

export async function EditIndex(req, res) {
  const id = parseInt(req.params.id);
  const transacao = await Transacao.findAll({
    where: { id },
    raw: true,
    nest: true,
  });
  if (transacao.length === 0 || transacao[0].userId != req.session.usuario.id) {
    return res.send("ERROR 404");
  }
  const categoria = await Categoria.findAll();
  return res.render("editarTransacao", { transacao, categoria });
}

export async function EditarTransacao(req, res) {
  const id = parseInt(req.params.id);

  try {
    if (!parseFloat(req.body.valor) && req.body.valor.length >= 0) {
      const erros = "Valor deve ser um número e maior que 0";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/transacao/" + id);
      });
      return;
    }
    if (req.body.descricao.length <= 2) {
      const erros = "Descrição deve ter 2 ou mais caractere";
      req.flash("error", erros);
      req.session.save(() => {
        res.redirect("/transacao/" + id);
      });
      return;
    }
    const transacao = await Transacao.update(req.body, {
      where: { id, userId: req.session.usuario.id },
    });
    req.flash("success", "Transação editada com sucesso");
    req.session.save(() => {
      res.redirect("/transacoes");
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

export async function ApagarTransacao(req, res) {
  const id = parseInt(req.params.id);
  try {
    if ((id = idUser)) {
      const transacao = await Transacao.destroy({ where: { id } });
      req.flash("success", "Transação apagada com sucesso");
      req.session.save(() => {
        res.redirect("/transacoes");
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
