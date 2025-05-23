const express = require('express');
const router = express.Router();
const controller = require('../controllers/ventasController');

/**
 * @swagger
 * /api/ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', controller.obtenerVentas);

/**
 * @swagger
 * /api/ventas:
 *   post:
 *     summary: Registrar una nueva venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venta registrada
 */
router.post('/', controller.crearVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   delete:
 *     summary: Eliminar una venta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a eliminar
 *     responses:
 *       204:
 *         description: Venta eliminada correctamente
 *       404:
 *         description: Venta no encontrada
 */
router.delete('/:id', controller.eliminarVenta);

/**
 * @swagger
 * /api/ventas/{id}:
 *   put:
 *     summary: Actualizar una venta por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la venta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Venta actualizada correctamente
 *       404:
 *         description: Venta no encontrada
 */
router.put('/:id', controller.actualizarVenta);

module.exports = router;
