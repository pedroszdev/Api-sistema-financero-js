import sequelize from "./db.js";
import User from "./UserModel.js";
import Transacao from "./TransacaoModel.js";
import Session from "./SessionModel.js";

export default async function sincronizarTabelas() {
  try {
    await sequelize.authenticate();

    User.hasMany(Transacao, {
      foreignKey: "userId",
    });

    Transacao.belongsTo(User, {
      foreignKey: "userId",
    });

    User.hasMany(Session, {
      foreignKey: "userId",
    });

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Erro durante a sincronização:", error);
  }
}
