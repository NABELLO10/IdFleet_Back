import { Sequelize } from "sequelize";
import db from "../config/db.js";

import Usuarios from '../models/Usuarios.js'
import EmpresasSistema from '../models/EmpresasSistema.js'

const UsuariosEmpresas = db.define('rel_usuarios_empresas', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey:true, 
        autoIncrement:true
    },     
    id_usuario:{
        type: Sequelize.INTEGER
    },  
    id_empresa:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: true,
    tableName : 'rel_usuarios_empresas'
})

UsuariosEmpresas.belongsTo(Usuarios, {foreignKey : "id_usuario"})
UsuariosEmpresas.belongsTo(EmpresasSistema, {foreignKey : "id_empresa"})


export default UsuariosEmpresas;
