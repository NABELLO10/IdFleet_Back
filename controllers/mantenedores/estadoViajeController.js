import EstadoViajes from "../../models/EstadoViajes.js"


const registrarEstado = async (req, res) => {
    const {nom_estado, id_empresa} = req.body

    try {  
        const existe = await EstadoViajes.findOne({
            where:{
                nom_estado, id_empresa               
            }
        }) 

        if(existe){
            const error = new Error("Estado ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await EstadoViajes.create({
            nom_estado, id_empresa         
        })      
      
        res.status(200).json({msg: "Estado Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarEstado =  async (req, res) =>{
    const {id} = req.params
    const {nom_estado } = req.body

    try {
        const existe = await EstadoViajes.findByPk(id) 

        if(!existe){
            const error = new Error("Estado no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await EstadoViajes.update({
            nom_estado
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Estado Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}



const eliminarEstado = async (req, res) =>{
    const { id } = req.params;

    try {
        const existe =  await EstadoViajes.findByPk(id)

        if(!existe){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }

        await EstadoViajes.destroy({
            where:{
                id : id
            }
        })

    res.status(200).json({msg: "Estado Eliminado"})
    
    } catch (error) {    
        // Verificar si es un error de restricción de clave foránea
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // El código '23503' es específico de error de FK en PostgreSQL
             res.status(409).json({ msg: "No se puede eliminar el Estado - relacion existente con otro registro" });
        }
        console.error(error);
    }       
}


const obtenerEstado = async (req, res) => {
    const {id_empresa} = req.params
    try {
        const lugares = await EstadoViajes.findAll({
            where:{
                id_empresa
            }
        });
        return res.status(200).json(lugares);        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }   
}


export{
    registrarEstado,
    editarEstado,
    obtenerEstado,
    eliminarEstado
}