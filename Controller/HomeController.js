import Transacao from "../Model/TransacaoModel.js";
export default async function home(req, res) {
  const user = req.session.usuario;

  const transacoes = await Transacao.findAll({
    where: {
      userId: user.id,
    },
    raw: true,
    nest: true,
  });

  let despesaMesAtual = 0;
  let receitaMesAtual = 0;
  let despesaTotal = 0;
  let receitaTotal = 0;
  const mesAtual = new Date().getMonth();
  const dadosCategoria = {};

  for (let i = 0; i < transacoes.length; i++) {
    let dataTransação = new Date(transacoes[i].data);

    if (
      dataTransacao.getMonth() === mesAtual &&
      dataTransacao.getFullYear() === anoAtual
    ) {
      //CALCULAR RECEITAS E DESPESAS DO MES ATUAL
      if (transacoes[i].tipo === "Despesa") {
        despesaMesAtual += transacoes[i].valor;

        const categoria = transacoes[i].categoria;
        const valor = transacoes[i].valor;
        // Se a categoria já existe no objeto, adiciona o valor.
        if (dadosCategoria[categoria]) {
          dadosCategoria[categoria] += valor;
        } else {
          // Se não existe, inicializa com o valor atual.
          dadosCategoria[categoria] = valor;
        }
      } else if (transacoes[i].tipo === "Receita") {
        receitaMesAtual += transacoes[i].valor;
      }

      //INFOS GRAFICO PIZZA
    }

    //CALCULAR SALDO
    if (transacoes[i].tipo === "Despesa") {
      despesaTotal += transacoes[i].valor;
    } else if (transacoes[i].tipo === "Receita") {
      receitaTotal += transacoes[i].valor;
    }
  }
  let saldo = receitaTotal - despesaTotal;

  //VE OS ULTIMOS 6 MESES
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const ultimos6Meses = [];
  for (let i = 5; i >= 0; i--) {
    let mesAtual = new Date();
    mesAtual.setMonth(mesAtual.getMonth() - i);
    ultimos6Meses.push(mesAtual.getMonth());
  }

  const dados6meses = {};
  let receita = 0;
  let despesa = 0;

  //PEGA AS INFOS DE RECEITA E DESPESA DOS ULTIMOS 6 MESES
  for (let mes of ultimos6Meses) {
    for (let i = 0; i < transacoes.length; i++) {
      let dataTransação = new Date(transacoes[i].data);
      if (mes === dataTransação.getMonth()) {
        if (transacoes[i].tipo === "Despesa") {
          despesa += transacoes[i].valor;
        }
        if (transacoes[i].tipo === "Receita") {
          receita += transacoes[i].valor;
        }
      }
    }
    dados6meses[meses[mes]] = { receita, despesa };
    receita = 0;
    despesa = 0;
  }
  const context = {
    receitaMesAtual: receitaMesAtual.toFixed(2),
    despesaMesAtual: despesaMesAtual.toFixed(2),
    saldo: saldo.toFixed(2),
    dados6meses,
    dadosCategoria,
    user,
  };

  return res.render("home", { context, user });
}
