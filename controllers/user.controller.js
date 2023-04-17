const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.json({
    msg: 'get API - controller',
    q, nombre, apikey
  });
};


const usuariosPut = (req = request, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'put API - controller',
    id
  })
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificacion de correo
  // Encriptar contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar BD
  await usuario.save();

  res.json({
    msg: 'POST API - controller',
    usuario
  })
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API - controller'
  })
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - controller'
  })
};

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }