import DoctosViajes from "../../models/DoctosViajes.js";
import Viajes from "../../models/Viajes.js";
import Log from "../../models/Log.js";


const registrarDoctoViaje = async (req, res) => {
  const { id_viaje, url, nom_docto } = req.body;

  try {
    await DoctosViajes.create({
      id_viaje,
      url,
      nom_docto,
    });

    res.status(200).json({ msg: "Documento Registrado" });
  } catch (error) {
    console.log(error);
  }
};

const editarDoctoViaje = async (req, res) => {
  const { id } = req.params;
  const { id_viaje, url, nom_docto } = req.body;

  try {
    const existe = await DoctosViajes.findByPk(id);

    if (!existe) {
      const error = new Error("Documento no existe");
      return res.status(400).json({ msg: error.message });
    }

    await DoctosViajes.update(
      {
        id_viaje,
        url,
        nom_docto,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ msg: "Documento Actualizado" });
  } catch (error) {
    console.log(error);
  }
};

const obtenerDoctoViaje = async (req, res) => {
  try {
    const { id_viaje } = req.params;
    const doctos = await DoctosViajes.findAll({
      where: { id_viaje },
      include: [{ model: Viajes }],
    });
    return res.status(200).json(doctos);
  } catch (error) {
    console.log(error);
  }
};

const elmininarDoctoViaje = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const existe = await DoctosViajes.findByPk(id);

    await DoctosViajes.destroy({
      where: {
        id,
      },
    });

    await Log.create({
      des_log:
        "Docto Viaje :" +
        usuario.nom_usuario +
        ` elimina : ` +
        JSON.stringify(existe),
    });

    res.status(200).json({ msg: "Documento Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrarDoctoViaje,
  editarDoctoViaje,
  obtenerDoctoViaje,
  elmininarDoctoViaje,
};
