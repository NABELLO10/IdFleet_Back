import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {       
        listarUnidadesPY, datosOxPY, tControl
             } from "../controllers/procesos/wialonController.js";
import { 
        obtenerCiudades,
        actualizarWialon,
        obtenerTokenWialon,
        obtenerDatosOx,
        obtenerResumenGPS,
        obtenerResumenTablet,
        obtenerAlertas,
        obtenerDatosOxFechas,
        obtenerLog,
        obtenerLogConductor,
        logRevisado,
        revisarTodos,
        obtenerLogConductor2,
        inicioConductor,
        obtenerConductorActivo,
        enviarGPS,
        obtenerDatosTabletFechas,
        obtenerLogTablet,
        obtenerEmpresaUsuario,
        obtenerUsuarioEmpresas
             } from "../controllers/generalController.js";


//Dashboard

import {       
        obtenerTotalCamiones,
        obtenerTotalArrastres,
        obtenerTotalArrastresOX,
        obtenerTotalArrastresTemp,
        obtenerTotalCamionesADAM,
        obtenerMovGPS
             } from "../controllers/reportes/Dashboard.js";

const router = express.Router()

router.get('/obtener-ciudades', checkAuth, obtenerCiudades)
router.put('/token-wialon', checkAuth, actualizarWialon)
router.get('/token-wialon', checkAuth, obtenerTokenWialon)
router.get('/datos-ox/:patente', checkAuth, obtenerDatosOx)
router.get('/datos-ox-fechas/:patente/:desde/:hasta', checkAuth, obtenerDatosOxFechas)
router.get('/datos-tablet-fechas/:patente/:desde/:hasta', checkAuth, obtenerDatosTabletFechas)
router.get('/alertas/:patente', checkAuth, obtenerAlertas)
router.get('/datos-tablet', checkAuth, obtenerResumenTablet)
router.get('/resumenGPS', checkAuth, obtenerResumenGPS)
router.get('/obtenerLog/:patente/:desde/:hasta/:empresa/:transportista', checkAuth, obtenerLog)
router.get('/obtenerLogTablet/:patente/:desde/:hasta', checkAuth, obtenerLogTablet)
router.get('/obtenerLogConductor/:empresa/:transportista/:patente', checkAuth, obtenerLogConductor)


router.get('/listarUnidadesPY', checkAuth, listarUnidadesPY)
router.get('/datosOx', checkAuth, datosOxPY)
router.get('/tControl', checkAuth, tControl)

router.put('/revisarLog/:id', logRevisado)
router.put('/revisarTodos/:patente',  revisarTodos)
router.get('/obtenerLogConductor2/:patente',  obtenerLogConductor2)
router.post('/inicioConductor',  inicioConductor)
router.get('/obtenerConductorActivo/:patente/:rut',  obtenerConductorActivo)
router.post('/enviarGPS',  enviarGPS)

router.get('/empresa_usuarios/:id_usuario', checkAuth, obtenerEmpresaUsuario)
router.get('/usuarios_empresas/:id_usuario', checkAuth, obtenerUsuarioEmpresas)

//Dashboard
router.get('/obtenerTotalCamiones/:id_transportista', checkAuth, obtenerTotalCamiones)
router.get('/obtenerTotalArrastres/:id_transportista', checkAuth, obtenerTotalArrastres)
router.get('/obtenerTotalArrastresOX/:id_transportista', checkAuth, obtenerTotalArrastresOX)
router.get('/obtenerTotalArrastresTemp/:id_transportista', checkAuth, obtenerTotalArrastresTemp)
router.get('/obtenerTotalCamionesADAM/:id_transportista', checkAuth, obtenerTotalCamionesADAM)
router.get('/obtenerMovGPS/:id_transportista', checkAuth, obtenerMovGPS)


export default router