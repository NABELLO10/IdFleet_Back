import TipoArrastre from "../../models/TipoArrastre.js"


const registrarTipoArrastre = async (req, res) => {
    const {nom_tipo} = req.body

    try {  
        const existe = await TipoArrastre.findOne({
            where:{
                nom_tipo               
            }
        }) 

        if(existe){
            const error = new Error("Tipo ya existe")
            return res.status(400).json({msg : error.message})
        }
                         
        await TipoArrastre.create({
            nom_tipo         
        })      
      
        res.status(200).json({msg: "Tipo Registrado"})

    } catch (error) {
        console.log(error)            
    }      
}


const editarTipoArrastre =  async (req, res) =>{
    const {id} = req.params
    const {nom_tipo} = req.body

    try {
        const existe = await TipoArrastre.findByPk(id) 

        if(!existe){
            const error = new Error("Tipo no existe")
            return res.status(400).json({msg : error.message})
        }      
                    
        await TipoArrastre.update({
            nom_tipo
        },{
            where:{
                id : id
            }
        })     
        res.status(200).json({msg: "Tipo Actualizado"})   

    } catch (error) {
        console.log(error)            
    }      
}



const eliminarTipoArrastre = async (req, res) =>{
    const { id } = req.params;

    try {
        const existe =  await TipoArrastre.findByPk(id)

        if(!existe){
            const error = new Error("ID de usuario inexistente")
            return res.status(400).json({msg: error.message})
        }

        await TipoArrastre.destroy({
            where:{
                id : id
            }
        })



    res.status(200).json({msg: "Tipo Eliminado"})
    
    } catch (error) {    
        // Verificar si es un error de restricción de clave foránea
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            // El código '23503' es específico de error de FK en PostgreSQL
             res.status(409).json({ msg: "No se puede eliminar el Tipo - relacion existente con otro registro" });
        }
        console.error(error);
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
    registrarTipoArrastre,
    editarTipoArrastre,
    obtenerTiposArrastre,
    eliminarTipoArrastre
}