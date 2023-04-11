const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
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
    this.app.use(this.usersPath, require('../routes/user.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en ', this.port);
    });
  }

}

module.exports = Server;