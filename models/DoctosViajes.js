import {Sequelize } from "sequelize";
import db from "../config/db.js";

import Viajes from "./Viajes.js";


const DoctosViajes = db.define('mov_doctos_viajes', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    id_viaje:{
        type: Sequelize.INTEGER
    },
    url:{
        type: Sequelize.STRING(2000)
    },
    nom_docto:{
        type: Sequelize.STRING(2000)
    }
})


DoctosViajes.belongsTo(Viajes,{foreignKey: 'id_viaje'})


export default DoctosViajes