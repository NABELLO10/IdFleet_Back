import { Sequelize } from "sequelize";
import db from "../config/db.js";

const TipoVehiculo = db.define('mae_tipo_vehiculos', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },   
    nom_tipo:{
        type: Sequelize.STRING(100)
    },    
    id_empresa:{
        type: Sequelize.INTEGER
    },
    id_empresa_sistema:{
        type: Sequelize.INTEGER
    },

},
{
    timestamps: true,
    tableName: 'mae_tipo_vehiculos'
})


export default TipoVehiculo