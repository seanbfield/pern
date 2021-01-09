const Sequelize = require('sequelize')
const sequelize = require('../sequelize.js')

const Todo = sequelize.define('Todo', {
  text: {
    type: Sequelize.STRING,
    // AllowNull is a flag that restricts a todo from being entered if it doesn't
    // have a text value
    allowNull: false,
    // len is a validation that checks that our todo is between 1 and 140 characters
    validate: {
      len: [1, 140]
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    // defaultValue is a flag that defaults a new todos complete value to false if
    // it isn't supplied one
    defaultValue: false
  }
});

Todo.sync()

module.exports = Todo;