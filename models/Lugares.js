import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Lugares = db.define('mae_lugares',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom_lugar:{
        type: Sequelize.STRING
    },
    id_empresa:{
       type: Sequelize.INTEGER
   }, 
},
{
    timestamps: true,
    tableName: 'mae_lugares'
})


export default Lugares
