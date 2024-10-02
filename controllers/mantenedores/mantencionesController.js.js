import Mantenciones from "../../models/Mantenciones.js"


const registrarMantencion = async (req, res) => {
    const {equipo, id_empresa, fec_mantencion, detalle, fec_prox_mantencion} = req.body

    try {                                 
        await Mantenciones.create({
            equipo, id_empresa, fec_mantencion, detalle, fec_prox_mantencion
        })      
      
        res.status(200).json({msg: "Mantención Registrada"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarMantencion =  async (req, res) =>{
    const {id} = req.params
    const {equipo,fec_mantencion, detalle, fec_prox_mantencion} = req.body

    try {
        const existe = await Mantenciones.findByPk(id) 

        if(!existe){
            const error = new Error("Mantención no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await Mantenciones.update({
            equipo,fec_mantencion, detalle, fec_prox_mantencion
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Mantención Actualizada"})   

    } catch (error) {
        console.log(error)            
    }      
}

const eliminarMantencion = async (req, res) =>{
    const {id} = req.params

    try {        
        await Mantenciones.destroy({
            where:{
                id : id
            }
        })        
         res.status(200).json({msg: "Mantención Eliminada"})

    } catch (error) {
        console.log(error)    
    }   
}

const obtenerMantenciones = async (req, res) => {
    try {
        const {equipo} = req.params
        const tipos = await Mantenciones.findAll( {
            where:{equipo}
        } )
        return res.status(200).json(tipos)        
    } catch (error) {
        console.log(error)
    }
}


export{
    registrarMantencion,
    editarMantencion,
    obtenerMantenciones,
    eliminarMantencion
}