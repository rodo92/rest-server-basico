const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-JWT');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validaRoles
}