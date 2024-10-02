import { Sequelize } from "sequelize";
import db from "../config/db.js";

const EstadoViajes = db.define('mae_estado_viajes', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },   
    nom_estado:{
        type: Sequelize.STRING(100)
    },    
    id_empresa:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName: 'mae_estado_viajes'
})


export default EstadoViajes