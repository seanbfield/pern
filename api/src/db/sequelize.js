const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgres://postgres:Satelite.119922@mailing-list.cpctcrvpppzv.us-east-1.rds.amazonaws.com:5432/postgres') // Example for postgres


const run = async ()=>{

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

}

  run()


  module.exports = sequelize
