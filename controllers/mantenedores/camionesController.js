import Camiones from "../../models/Camiones.js"
import UnidadesWialon from "../../models/UnidadesWialon.js"

import Arrastres from "../../models/Arrastres.js"
import Transportistas from "../../models/Transportistas.js"
import EmpresasSistema from "../../models/EmpresasSistema.js"
import ADAM_unidades from "../../models/ADAM_unidades.js"


function generateRandomDeviceId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

const registrarCamion = async (req, res) => {
    const {nom_patente,fec_rev_tecnica, fec_per_circulacion, fec_seguro, id_empresa, id_wialon, est_activo_idfleet, est_activo_adam, id_transportista, nom_transportista, id_arrastre, pat_arrastre, id_conductor, nom_conductor, id_empresa_global}  = req.body

    try {
        const existe = await Camiones.findOne({
            attributes: ['id'],
            where:{
                nom_patente,             
                id_transportista
            }
        }) 
    
        if(existe){
            const error = new Error("Camión ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await Camiones.create({
            nom_patente,fec_rev_tecnica, fec_per_circulacion, fec_seguro, id_empresa, id_wialon, est_activo_idfleet, est_activo_adam, id_transportista, nom_transportista, id_arrastre, pat_arrastre, id_conductor, nom_conductor, id_empresa_global
        })   
        

        await ADAM_unidades.create({
            id_transportista,
            nom_patente,
            device_id: generateRandomDeviceId(), // Asignar device_id apropiado
            grupo_id: '', // Asignar grupo_id apropiado
            canales: 0, // Asignar canales apropiado
            ip_registro: '', // Asignar ip_registro apropiado
            puerto_registro: '', // Asignar puerto_registro apropiado
            puerto_transmision: '', // Asignar puerto_transmision apropiado
            linktype: '', // Asignar linktype apropiado
            devicetype: '', // Asignar devicetype apropiado
            gpstime: '', // Asignar gpstime apropiado
            altitud: '', // Asignar altitud apropiado
            direccion: '', // Asignar direccion apropiado
            velocidad: '', // Asignar velocidad apropiado
            time: '', // Asignar time apropiado
            lat: '', // Asignar lat apropiado
            lon: '', // Asignar lon apropiado
            est_activo: est_activo_adam,
            fec_rev_tecnica,
            fec_per_circulacion,
            fec_seguro
        });
      
                
        res.status(200).json({msg: "Camión Registrado!"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor: " + error.message });
    } 
}


const editarCamion =  async (req, res) =>{
    const {id} = req.params
    const {nom_patente,fec_rev_tecnica, fec_per_circulacion, fec_seguro, id_empresa, id_wialon, est_activo_idfleet, est_activo_adam, id_transportista, nom_transportista, id_arrastre, pat_arrastre, id_conductor, nom_conductor, id_empresa_global} = req.body

    try {     
        await Camiones.update({
            nom_patente,fec_rev_tecnica, fec_per_circulacion, fec_seguro, id_empresa, id_wialon, est_activo_idfleet, est_activo_adam, id_transportista, nom_transportista, id_arrastre, pat_arrastre, id_conductor, nom_conductor, id_empresa_global
        },{
            where:{
                id : id
            }
        })    


        if(nom_patente){
            const adamUnidad = await ADAM_unidades.findOne({
                where: { nom_patente, id_transportista }
            });
    
            if (adamUnidad) {
                await ADAM_unidades.update({
                    id_transportista,
                    nom_patente,
                    est_activo: est_activo_adam,
                    fec_rev_tecnica,
                    fec_per_circulacion,
                    fec_seguro
                }, {
                    where: {
                        id: adamUnidad.id
                    }
                });
            } else {
                await ADAM_unidades.create({
                    id_transportista,
                    nom_patente,
                    device_id: generateRandomDeviceId(), // Asignar device_id apropiado
                    grupo_id: '', // Asignar grupo_id apropiado
                    canales: 0, // Asignar canales apropiado
                    ip_registro: '', // Asignar ip_registro apropiado
                    puerto_registro: '', // Asignar puerto_registro apropiado
                    puerto_transmision: '', // Asignar puerto_transmision apropiado
                    linktype: '', // Asignar linktype apropiado
                    devicetype: '', // Asignar devicetype apropiado
                    gpstime: '', // Asignar gpstime apropiado
                    altitud: '', // Asignar altitud apropiado
                    direccion: '', // Asignar direccion apropiado
                    velocidad: '', // Asignar velocidad apropiado
                    time: '', // Asignar time apropiado
                    lat: '', // Asignar lat apropiado
                    lon: '', // Asignar lon apropiado
                    est_activo: est_activo_adam,
                    fec_rev_tecnica,
                    fec_per_circulacion,
                    fec_seguro
                });
            }
        }

        
               
        res.status(200).json({msg: "Camión Actualizado"})

    } catch (error) {
        console.log(error)            
    }      
}


const eliminarCamion = async (req, res) =>{
    const {id} = req.params

    try {        
        await Camiones.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Camión Eliminado"})
    } catch (error) {
        console.log(error)    
    }   
}


const obtenerCamiones = async (req, res) => {
    try {
        const { id_transportista } = req.params;
        const camiones = await Camiones.findAll({
            where: { id_transportista},
            include: [{model : EmpresasSistema}]         
        });
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}


const obtenerTodosCamiones = async (req, res) => {
    try {
        const { id_empresa_global } = req.params;
        const camiones = await Camiones.findAll({
            where: {id_empresa_global, est_activo : 1 },
            include: [{model : EmpresasSistema}, {model : Transportistas}, {model : Arrastres}]
        });
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}


const obtenerUnidadesWialon = async (req, res) => {
    try {      
        const camiones = await UnidadesWialon.findAll({});
        return res.status(200).json(camiones);        
     } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "Error interno del servidor." });
     }   
}






export{
    registrarCamion,
    editarCamion,
    eliminarCamion,
    obtenerCamiones,
    obtenerTodosCamiones,
    obtenerUnidadesWialon
}