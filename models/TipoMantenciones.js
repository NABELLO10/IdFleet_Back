import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Empresas from "./Empresas.js";

const TipoMantenciones = db.define('mae_tipo_mantencion', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_tipo_mantencion:{
        type: Sequelize.STRING
    },
    est_activo:{
        type: Sequelize.INTEGER
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: true,
    tableName: 'mae_tipo_mantencion'
})



export default TipoMantenciones