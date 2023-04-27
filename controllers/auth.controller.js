const { response, request } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generaJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response) => {

  const { correo, password } = req.body;
  try {

    // verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'usuario o password no son correctos - correo'
      })
    }


    // si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'usuario o password no son correctos - estado: false'
      })
    }

    // verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'usuario o password no son correctos - password'
      })
    }

    // generar el JWT
    const token = await generaJWT(usuario.id);

    res.json({
      usuario, token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }

}

module.exports = { login };