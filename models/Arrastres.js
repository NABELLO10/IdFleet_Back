import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";

import Transportista from "./Transportistas.js";
import EmpresasSistema from "./EmpresasSistema.js";
import TipoArrastre from "./TipoArrastre.js";


const Arrastres = db.define('mae_arrastres', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },    
    id_transportista:{
        type: Sequelize.INTEGER
    },   
    id_tipo_arrastre:{
        type: Sequelize.INTEGER
    },  
    id_wialon:{
        type: Sequelize.INTEGER
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
    est_activo:{
        type: Sequelize.INTEGER
    }, 
    est_ox:{
        type: Sequelize.INTEGER
    }, 
    est_temp:{
        type: Sequelize.INTEGER
    },        
    id_empresa:{
        type: Sequelize.INTEGER
    },
    id_empresa_global:{
        type: Sequelize.INTEGER
    },
  
},
{
    timestamps: false,
    tableName : 'mae_arrastres'
})

Arrastres.belongsTo(Transportista, {foreignKey : "id_transportista"})
Arrastres.belongsTo(EmpresasSistema, {foreignKey : "id_empresa"})
Arrastres.belongsTo(TipoArrastre, {foreignKey : "id_tipo_arrastre"})

export default Arrastres;
