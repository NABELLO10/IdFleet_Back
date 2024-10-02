import { Sequelize } from "sequelize";
import db from "../config/db.js";
import EmpresasSistema from "./EmpresasSistema.js";

const Camiones = db.define('mae_camiones', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    }, 
    nom_patente:{
        type: Sequelize.STRING
    },     
    fec_rev_tecnica:{
        type: Sequelize.STRING(20)
    },
    fec_per_circulacion:{
        type: Sequelize.STRING(20)
    },  
    fec_seguro:{
        type: Sequelize.STRING(20)
    }, 
    id_empresa:{
        type: Sequelize.INTEGER
    },
     id_wialon:{
        type: Sequelize.INTEGER
    },   
    est_activo_idfleet:{
        type: Sequelize.INTEGER
    },   
    est_activo_adam:{
        type: Sequelize.INTEGER
    },   
    id_transportista:{
        type: Sequelize.INTEGER
    },   
    nom_transportista:{
        type: Sequelize.STRING
    },   
    id_arrastre:{
        type: Sequelize.INTEGER,
    },   
    pat_arrastre:{
        type: Sequelize.STRING
    }, 
    id_empresa_global:{
        type: Sequelize.INTEGER
    }, 
    id_conductor:{
        type: Sequelize.INTEGER,
    },   
    nom_conductor:{
        type: Sequelize.STRING
    }, 
},
{
    timestamps: true,
    tableName : 'mae_camiones'
})


Camiones.belongsTo(EmpresasSistema, {foreignKey : "id_empresa"})



export default Camiones;
