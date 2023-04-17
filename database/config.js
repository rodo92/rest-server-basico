const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: true
    });

    console.log('Base de datos ONLINE');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
}

module.exports = {
  dbConnection
}