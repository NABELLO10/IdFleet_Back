import { Sequelize } from "sequelize";
import db from "../config/db.js";


const Mantenciones = db.define('mov_mantenciones', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },
    equipo:{
        type: Sequelize.STRING(500)
    },
    fec_mantencion:{
        type: Sequelize.STRING
    },
    detalle:{
        type: Sequelize.STRING(1000)
    }, 
    fec_prox_mantencion:{
        type: Sequelize.STRING
    },   
    id_empresa:{
        type: Sequelize.INTEGER
    },   
},
{
    timestamps: true,
    tableName: 'mov_mantenciones'
})



export default Mantenciones