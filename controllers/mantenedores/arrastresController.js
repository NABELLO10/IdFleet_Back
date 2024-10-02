import Arrastres from "../../models/Arrastres.js"

import Transportistas from "../../models/Transportistas.js"
import EmpresasSistema from "../../models/EmpresasSistema.js"
import TipoArrastre from "../../models/TipoArrastre.js"


const registrarArrastres = async (req, res) => {
    const {id_transportista, id_tipo_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_ox,  est_temp, id_wialon }  = req.body

     try { 
        const existe = await Arrastres.findOne({
            where: { nom_patente, id_transportista }
          });
               
          if (existe) {
            console.log("error")
            return res.status(400).json({ msg: "Arrastre ya existe" });
          }
          
        await Arrastres.create({
            id_transportista, id_tipo_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_ox,  est_temp, id_wialon
        })      
                
        res.status(200).json({msg: "Arrastre Registrado!"})

     } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor: " + error.message });
    }  
}


const editarArrastre =  async (req, res) =>{
    const {id} = req.params
    const {id_transportista, id_tipo_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_ox,  est_temp, id_wialon} = req.body

    try {
     
        await Arrastres.update({
            id_transportista, id_tipo_arrastre, nom_patente, fec_rev_tecnica, fec_per_circulacion, fec_seguro, est_activo, id_empresa, id_empresa_global, est_ox,  est_temp,
            id_wialon
        },{
            where:{
                id : id
            }
        })    
               
         res.status(200).json({msg: "Arrastre Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}

const eliminarArrastre = async (req, res) =>{
    const {id} = req.params
    try {        
        await Arrastres.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Arrastre Eliminado"})

    } catch (error) {
        console.log(error)    
    }   
}


const obtenerArrastres = async (req, res) => {
    try {
        const { id_transportista } = req.params;
        const arrastres = await Arrastres.findAll({
            where: { id_transportista },
            include: [{model : EmpresasSistema}, {model : Transportistas}, {model : TipoArrastre}]
        });
        return res.status(200).json(arrastres);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}

const obtenerTodosArrastres = async (req, res) => {
    try {
        const {id_transportista } = req.params;
        const arrastres = await Arrastres.findAll({
            where: {id_transportista, est_activo : 1 },
            include: [{model : EmpresasSistema}, {model : Transportistas}, {model : TipoArrastre}]
        });
        return res.status(200).json(arrastres);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}


const obtenerTiposArrastre = async (req, res) => {
    try {
        const tipos = await TipoArrastre.findAll({});
        return res.status(200).json(tipos);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}



export{
    registrarArrastres,
    editarArrastre,
    eliminarArrastre,
    obtenerArrastres,
    obtenerTodosArrastres,
    obtenerTiposArrastre
}