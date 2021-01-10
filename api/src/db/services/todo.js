// api/db/services/user.js
const Todo = require('../models/todo');

module.exports = {
  findAll: async (id) => {
    return Todo.findAll();
  },
  findById: async (id) => {
    return Todo.findOne({ where : { id: id } });
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
