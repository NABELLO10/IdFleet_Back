import DetViajes from "../../models/DetViajes.js"
import Viajes from "../../models/Viajes.js"
import MovGPS from "../../models/MovGPS.js"
import Camiones from "../../models/Camiones.js"


const registrarViaje = async (req, res) => {
    const {id_unidad, num_hr, pat_camion, pat_arrastre, id_transportista, nom_transportista, id_conductor, nom_conductor, id_empresa} = req.body

    try {  
                                
      const viajeRegistrado =  await Viajes.create({
            id_unidad, num_hr, pat_camion, pat_arrastre, id_transportista, nom_transportista, id_conductor, nom_conductor, id_empresa     
        })      
      
        res.status(200).json(viajeRegistrado)

    } catch (error) {
        console.log(error)            
    }      
}


const editarViaje =  async (req, res) =>{
    const {id} = req.params
    const {id_unidad, num_hr, pat_camion, pat_arrastre, id_transportista, nom_transportista, id_conductor, nom_conductor} = req.body

    try {
        const existe = await Viajes.findByPk(id) 

        if(!existe){
            const error = new Error("Viaje no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
       const viaje = await Viajes.update({
            id_unidad, num_hr, pat_camion, pat_arrastre, id_transportista, nom_transportista, id_conductor, nom_conductor
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json(viaje)   

    } catch (error) {
        console.log(error)            
    }      
}



const eliminarViaje = async (req, res) =>{
    const { id } = req.params;

    try {
        const existe =  await Viajes.findByPk(id)

        if(!existe){
            const error = new Error("Viaje inexistente")
            return res.status(400).json({msg: error.message})
        }

        await DetViajes.destroy({
            where:{
                id_viaje : id
            }
        })
        await Viajes.destroy({
            where:{
                id : id
            }
        })



    res.status(200).json({msg: "Viaje Eliminado"})
    
    } catch (error) {    
        // Verificar si es un error de restricción de clave foránea
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // El código '23503' es específico de error de FK en PostgreSQL
             res.status(409).json({ msg: "No se puede eliminar el Viaje - relacion existente con otro registro" });
        }
        console.error(error);
    }       
}


const obtenerViajes = async (req, res) => {
    const {id_empresa} = req.params
    try {
        const viajes = await Viajes.findAll({
            where: {
              id_empresa: id_empresa
            }
          });
        return res.status(200).json(viajes);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}

const obtenerGPS = async (req, res) => {
    const { id_unidad } = req.params;
    try {

        const camion = await Camiones.findOne({
            where: {
              id: id_unidad
            }
          });

        const gps = await MovGPS.findAll({
            where: {
                id_wialon : camion.id_wialon
            },
            limit: 100,
            order: [['id', 'DESC']] // Ordena por el campo 'id' en orden descendente
        });
        return res.status(200).json(gps);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
}


export{
    registrarViaje,
    editarViaje,
    obtenerViajes,
    eliminarViaje,
    obtenerGPS
}