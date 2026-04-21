import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
  },
});

export default Session;
