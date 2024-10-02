import Camiones from '../../models/Camiones.js'
import Arrastres from '../../models/Arrastres.js'
import ADAM_unidades from '../../models/ADAM_unidades.js'
import MovGPS from '../../models/MovGPS.js'

const obtenerTotalCamiones = async (req, res) => {
    try {
      const { id_transportista } = req.params;
      const resultado = await Camiones.count({
        where: {
            id_transportista,
        },
      });
    
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTotalCamionesADAM = async (req, res) => {
    try {
      const { id_transportista } = req.params;
      const resultado = await ADAM_unidades.count({
        where: {
            id_transportista,
        },
      });
    
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTotalArrastres = async (req, res) => {
    try {
      const { id_transportista } = req.params;
      const resultado = await Arrastres.count({
        where: {
            id_transportista,
        },
      });    
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTotalArrastresOX = async (req, res) => {
    try {
      const { id_transportista } = req.params;
      const resultado = await Arrastres.count({
        where: {
            id_transportista,
            est_ox : true
        },
      });    
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTotalArrastresTemp = async (req, res) => {
    try {
      const { id_transportista } = req.params;
      const resultado = await Arrastres.count({
        where: {
            id_transportista,
            est_temp : true
        },
      });    
      return res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  

const obtenerMovGPS = async (req, res) => {
  try {
    const { id_transportista } = req.params;
    const resultado = await MovGPS.findAll({
      where: {
          id_transportista,
      },
    });
  
    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
  }
};



export{
    obtenerTotalCamiones,
    obtenerTotalArrastres,
    obtenerTotalArrastresOX,
    obtenerTotalArrastresTemp,
    obtenerTotalCamionesADAM,
    obtenerMovGPS
}
