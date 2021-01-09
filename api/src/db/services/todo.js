// api/db/services/user.js
const Todo = require('../models/todo');

module.exports = {
  findAll: async (id) => {
    return Todo.findAll();
    // return { 'hola' : 'mundo' }
  },
  findById: async (id) => {
    return Todo.findOne({ where : { id: id } });
    // return { 'hola' : 'mundo' }
  },
  create : async (todo)=>{
    return Todo.create(todo)
  },
  update : async (id, todo)=>{
    return Todo.update(todo, { where : {
      id : id || todo.id
    } })
  },
  delete : async (id)=>{
    return Todo.destroy({
      where : {
        id : id 
      }
    })
  }
};
