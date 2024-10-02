
import { Sequelize } from "sequelize";
import db from "../config/db.js";

const MovGPS = db.define(
  "mov_gps",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    patente: {
      type: Sequelize.STRING(2000),
    },
    id_wialon: {
      type: Sequelize.INTEGER,
    },
    id_transportista: {
      type: Sequelize.INTEGER,
    },
    fechaGPS: {
      type: Sequelize.STRING(200),
    },    
    velocidad: {
      type: Sequelize.STRING(200),
    },
    latitud: {
      type: Sequelize.STRING(200),
    },
    longitud: {
      type: Sequelize.STRING(200),
    },
    curso: {
      type: Sequelize.STRING(200),
    },
    altitud: {
      type: Sequelize.STRING(200),
    }
    },
  {
    timestamps: true,
    tableName: "mov_gps",
  }
);


export default MovGPS

