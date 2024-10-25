import DetViajes from "../../models/DetViajes.js"
import Viajes from "../../models/Viajes.js"
import Lugares from "../../models/Lugares.js"

import EstadoViajes from "../../models/EstadoViajes.js"


const registrarDetViaje = async (req, res) => {
    const {id_viaje, id_origen, id_destino, fec_llegada,hora_llegada, fec_salida , hora_salida, est_viaje } = req.body

    try {  
                                
        await DetViajes.create({
            id_viaje, id_origen, id_destino, fec_llegada,hora_llegada, fec_salida , hora_salida, est_viaje : 1        
        })      
      
        res.status(200).json({msg: "Detalle Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarDetViaje =  async (req, res) =>{
    const {id} = req.params
    const { id_viaje, id_origen, id_destino, fec_llegada,hora_llegada, fec_salida , hora_salida, est_viaje } = req.body

    try {
        const existe = await DetViajes.findByPk(id) 

        if(!existe){
            const error = new Error("Detalle no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await DetViajes.update({
            id_viaje, id_origen, id_destino, fec_llegada,hora_llegada, fec_salida , hora_salida, est_viaje 
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Detalle Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}



const eliminarDetViaje = async (req, res) =>{
    const { id } = req.params;

    try {
        const existe =  await DetViajes.findByPk(id)

        if(!existe){
            const error = new Error("Detalle inexistente")
            return res.status(400).json({msg: error.message})
        }

        await DetViajes.destroy({
            where:{
                id : id
            }
        })
    res.status(200).json({msg: "Detalle Eliminado"})
    
    } catch (error) {    
        // Verificar si es un error de restricción de clave foránea
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // El código '23503' es específico de error de FK en PostgreSQL
             res.status(409).json({ msg: "No se puede eliminar el Detalle del Viaje - relacion existente con otro registro" });
        }
        console.error(error);
    }       
}


const obtenerDetViajes = async (req, res) => {
    const { id_viaje } = req.params;
    try {
        const viajes = await DetViajes.findAll({
            where: { id_viaje },
            include: [
                { model: Viajes }, // Incluye la información de los viajes
                { model: Lugares, as: 'origen' }, // Origen con alias
                { model: Lugares, as: 'destino' }, // Destino con alias
                { model: EstadoViajes } // Incluye el estado de los viajes
            ]
        });
        return res.status(200).json(viajes);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}

export{
    registrarDetViaje,
    editarDetViaje,
    obtenerDetViajes,
    eliminarDetViaje
}