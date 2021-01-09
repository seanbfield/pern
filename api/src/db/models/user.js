const Sequelize = require('sequelize')
const sequelize = require('../sequelize.js')


const User = sequelize.define('User', {
  // Model attributes are defined here
  oAuthId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  oAuthData: {
    type: Sequelize.JSONB
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});


User.sync()

module.exports = User