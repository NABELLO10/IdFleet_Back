
import MovGPS from "../../models/MovGPS.js";
import Camiones from "../../models/Camiones.js";
import Token from "../../models/Token.js";
import cron from "node-cron";
import { exec } from "child_process"; // Asegúrate de importar exec si no lo has hecho
import Sequelize from "sequelize";
import { promisify } from "util";

import { fileURLToPath } from "url";
import { dirname, join } from "path"; //

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let arraySensores = [];

// Esta es la tarea que deseas programar
const registrarSensor = async () => {
  const token = await Token.findOne({
    attributes: ["token"],
    where: {
      id: 1,
    },
  });

  const wialonCamiones = await Camiones.findAll({
    where: {
      est_activo_idfleet: 1,
      id_wialon: {
        [Sequelize.Op.gt]: 0, // Op.gt es el operador 'greater than' (mayor que)
      },
    },
  });

  const idWialonArrayGral = wialonCamiones.map((camion) => camion.id_wialon);


//DATOS GENERALES
  if (idWialonArrayGral.length > 0) {
    const unidadesStr = idWialonArrayGral.join(",");
    const scriptPath = join(__dirname, "datosGralCamiones.py");

    try {
      const resultado = await execAsync(
        `python ${scriptPath} ${token.token} ${unidadesStr}`
      );

      arraySensores = JSON.parse(resultado.stdout);
    } catch (error) {
      console.error(`exec error: ${error}`);
      return;
    }

     arraySensores.map(async (r) => {

      const camion = await Camiones.findOne({          
        where: { id_wialon : r.idWialon },          
      });

      await MovGPS.create({
        patente: r.Patente,
        velocidad: r.Velocidad,
        id_wialon: r.idWialon,
        id_transportista : camion.id_transportista,
        fechaGPS: r.FechaGPS,
        latitud: r.Latitud,
        longitud: r.Longitud,
        curso: r.Curso,
        altitud: r.Altitud,     
      });        
    }); 
  }
};

// Programa la tarea para que se ejecute, por ejemplo, cada 3 minutos
cron.schedule("*/5 * * * *", () => {
  console.log("Tarea programada OBTENER GPS general siendo ejecutada...");
  registrarSensor();

});
