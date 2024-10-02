import { Sequelize } from "sequelize";
import db from "../config/db.js";

const TipoArrastre = db.define('mae_tipo_arrastre', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    nom_tipo:{
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
    tableName: 'mae_tipo_arrastre'
})



export default TipoArrastre