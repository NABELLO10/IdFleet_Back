import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Lugares from "./Lugares.js";
import Viajes from "./Viajes.js";
import EstadoViajes from "./EstadoViajes.js";

const DetViajes = db.define('det_viajes',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_viaje:{
        type: Sequelize.INTEGER
    },
    id_origen:{
        type: Sequelize.INTEGER
    },
    id_destino:{
        type: Sequelize.INTEGER
    },
    fec_llegada :{
        type: Sequelize.STRING
    },
    hora_llegada :{
        type: Sequelize.STRING
    },
    fec_salida:{
        type: Sequelize.STRING
    },
    hora_salida :{
        type: Sequelize.STRING
    },
    est_viaje:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName: 'det_viajes'
})


DetViajes.belongsTo(Lugares, { as: 'origen', foreignKey: 'id_origen' });
DetViajes.belongsTo(Lugares, { as: 'destino', foreignKey: 'id_destino' });
DetViajes.belongsTo(Viajes, {foreignKey : "id_viaje"})
DetViajes.belongsTo(EstadoViajes, {foreignKey : "est_viaje"})

export default DetViajes
