const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    // Conectar db
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // public directory
    this.app.use(express.static('public'));

    // CORS
    this.app.use(cors());

    // Parse and read body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en ', this.port);
    });
  }

}

module.exports = Server;