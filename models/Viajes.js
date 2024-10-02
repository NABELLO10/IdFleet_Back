import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Camiones from "./Camiones.js";

const Viajes = db.define('mov_viajes',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },  
    id_unidad:{
        type: Sequelize.INTEGER
    },
    num_hr:{
        type: Sequelize.STRING
    },
    pat_camion:{
        type: Sequelize.STRING(10)
    },     
    pat_arrastre:{
        type: Sequelize.STRING(10)
    },
    id_transportista:{
        type: Sequelize.INTEGER
    },  
    nom_transportista:{
        type: Sequelize.STRING(1000)
    },      
    id_conductor:{
        type: Sequelize.INTEGER
    },
    nom_conductor:{
        type: Sequelize.STRING(1000)
    },
    id_empresa:{
        type: Sequelize.INTEGER
    },
},
{
    timestamps: true,
    tableName: 'mov_viajes'
})

Viajes.belongsTo(Camiones, {foreignKey : "id_unidad"})



export default Viajes
