const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total, usuarios
  });
};


const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findOneAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPost = async (req = request, res = response) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

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

const usuariosDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const usuarioAutenticado = req.usuario;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json({ usuario, usuarioAutenticado })
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - controller'
  })
};

module.exports = { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }