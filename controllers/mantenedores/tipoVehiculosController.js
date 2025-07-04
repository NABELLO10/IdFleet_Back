import TipoVehiculo from "../../models/TipoVehiculo.js";

const registrarTipoVehiculo = async (req, res) => {
  const { nom_tipo, id_empresa } = req.body;

  console.log(id_empresa)

  try {
    const existe = await TipoVehiculo.findOne({
      where: {
        nom_tipo   
      },
    });

    if (existe) {
      const error = new Error("Tipo ya existe");
      return res.status(400).json({ msg: error.message });
    }

    await TipoVehiculo.create({
      nom_tipo,
      id_empresa   
    });

    res.status(200).json({ msg: "Tipo Registrado" });
  } catch (error) {
    console.log(error);
  }
};

const editarTipoVehiculo = async (req, res) => {
  const { id } = req.params;
  const { nom_tipo } = req.body;

  try {
    const existe = await TipoVehiculo.findByPk(id);

    if (!existe) {
      const error = new Error("Tipo no existe");
      return res.status(400).json({ msg: error.message });
    }

    await TipoVehiculo.update(
      {
        nom_tipo,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({ msg: "Tipo Actualizado" });
  } catch (error) {
    console.log(error);
  }
};

const eliminartipoVehiculo = async (req, res) => {
  const { id } = req.params;

  try {
    const existe = await TipoVehiculo.findByPk(id);

    if (!existe) {
      const error = new Error("ID de usuario inexistente");
      return res.status(400).json({ msg: error.message });
    }

    await TipoVehiculo.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ msg: "Tipo Eliminado" });
  } catch (error) {
    // Verificar si es un error de restricción de clave foránea
    if (error.name === "SequelizeForeignKeyConstraintError") {
      // El código '23503' es específico de error de FK en PostgreSQL
      res
        .status(409)
        .json({
          msg: "No se puede eliminar el Tipo - relacion existente con otro registro",
        });
    }
    console.error(error);
  }
};

const obtenerTipoVehiculo = async (req, res) => {
  try {
    const tipos = await TipoVehiculo.findAll({});
    return res.status(200).json(tipos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export {
  registrarTipoVehiculo,
  editarTipoVehiculo,
  obtenerTipoVehiculo,
  eliminartipoVehiculo,
};
