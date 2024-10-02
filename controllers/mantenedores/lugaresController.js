import Lugares from "../../models/Lugares.js"


const registrarLugar = async (req, res) => {
    const {nom_lugar, id_empresa} = req.body

    try {  
        const existe = await Lugares.findOne({
            where:{
                nom_lugar, id_empresa               
            }
        }) 

        if(existe){
            const error = new Error("Origen ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await Lugares.create({
            nom_lugar, id_empresa         
        })      
      
        res.status(200).json({msg: "Origen Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarLugar =  async (req, res) =>{
    const {id} = req.params
    const {nom_lugar } = req.body

    try {
        const existe = await Lugares.findByPk(id) 

        if(!existe){
            const error = new Error("Origen no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await Lugares.update({
            nom_lugar
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Origen Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}



const eliminarLugar = async (req, res) =>{
    const { id } = req.params;

    try {
        const existe =  await Lugares.findByPk(id)

        if(!existe){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }

        await Lugares.destroy({
            where:{
                id : id
            }
        })

    res.status(200).json({msg: "Origen Eliminado"})
    
    } catch (error) {    
        // Verificar si es un error de restricción de clave foránea
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // El código '23503' es específico de error de FK en PostgreSQL
             res.status(409).json({ msg: "No se puede eliminar el Origen - relacion existente con otro registro" });
        }
        console.error(error);
    }       
}


const obtenerLugar = async (req, res) => {
    const {id_empresa} = req.params
    try {
        const lugares = await Lugares.findAll({
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
    registrarLugar,
    editarLugar,
    obtenerLugar,
    eliminarLugar
}