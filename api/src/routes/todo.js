const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const passport = require('passport');

const todoService = require('../db/services/todo');

const router = express();


router.use((req, res, next) => {
  const token = req.headers['authorization'];

  jwt.verify(token, JWT_KEY, function (err, data) {
      if (err) {
          res.status(401).send({ error: "NotAuthorized" })
      } else {
          req.user = data;
          next();
      }
  })
})

router.get('/', async (req, res) => {
  todo = await todoService.findAll()
  res.send(todo);
})

router.get('/:id', async (req, res) => {
  todo = await todoService.findById(req.params.id)
  res.send(todo);
})

router.post('/', async (req, res) =>{
  newTodo = await todoService.create(req.body)
  res.send(newTodo)
})

router.put('/:id', async (req, res) =>{
  updatedTodo = await todoService.update(req.params.id, req.body)
  res.send({ updated : true, id : req.params.id})
})

router.delete('/:id', async (req, res) =>{
  deletedTodo = await todoService.delete(req.params.id)
  res.send({ deleted : true, id : req.params.id})
})

module.exports = router