import express from "express";
import checkAuth from "../middleware/authMiddleware.js";

import {       
    registrarViaje,
    editarViaje,
    obtenerViajes,
    eliminarViaje,
    obtenerGPS
             } from "../controllers/procesos/viajesController.js";

import {       
    registrarDetViaje,
    editarDetViaje,
    obtenerDetViajes,
    eliminarDetViaje
             } from "../controllers/procesos/detViajesController.js";


const router = express.Router()

// VIAJES ------------------------------------------------------------------------//
router.post("/viaje", checkAuth, registrarViaje)
router.put("/viaje/:id", checkAuth, editarViaje)
router.delete("/viaje/:id", checkAuth, eliminarViaje)
router.get('/viaje/:id_empresa', checkAuth,obtenerViajes) 
router.get('/gps/:id_unidad', checkAuth,obtenerGPS) 

//DETALLE VIAJES ------------------------------------------------------------------------//
router.post("/detViaje", checkAuth, registrarDetViaje)
router.put("/detViaje/:id", checkAuth, editarDetViaje)
router.delete("/detViaje/:id", checkAuth, eliminarDetViaje)
router.get('/detViaje/:id_viaje', checkAuth,obtenerDetViajes ) 

export default router