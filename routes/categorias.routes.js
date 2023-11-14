const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias.controller');

const router = Router();

/**
 * {{url}}/api/categorias
 */

/** Obtener todas las categorias - publico */
router.get('/', obtenerCategorias);

/** Obtener una categorias por id - publico */
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId().bail().custom(existeCategoriaPorId)
], obtenerCategoria);

/** Crear categorias - privado - cualquier persona con token valido */
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

/** Actualizar categoria por id - privado - cualquier persona con token valido */
router.put('/:id', (req, res) => {
  res.json('put')
});

/** Borrar una categoria - admin - cualquier persona con token valido */
router.delete('/:id', (req, res) => {
  res.json('delete')
});

module.exports = router;