const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCampos,
  validarJWT,
  esAdmuinRole,
  tieneRol } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  categoriaEliminar
} = require('../controllers/categorias.controller');

const router = Router();

/**
 * {{url}}/api/categorias
 */

/** Obtener todas las categorias - publico */
router.get('/', obtenerCategorias);

/** Obtener una categorias por id - publico */
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria);

/** Crear categorias - privado - cualquier persona con token valido */
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

/** Actualizar categoria por id - privado - cualquier persona con token valido */
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], actualizarCategoria);

/** Borrar una categoria - admin - cualquier persona con token valido */
router.delete('/:id', [
  validarJWT,
  esAdmuinRole,
  tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], categoriaEliminar);

module.exports = router;