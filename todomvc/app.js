const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
var Todos = require("./models/todos")
mongoose.Promise = require('bluebird')
const app = express();
const dbURL = "mongodb://localhost:27017/todomvc"


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

mongoose.connect(dbURL).then(function (err, db) {
    if (err) {
        console.log('error', err)
    };
    console.log("Connected to Mongoose")
})

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})
app.get('/api/todos/', (req, res) => {
    Todos.find().then(foundTodos => {
        res.send(foundTodos);
    })
        .catch(err => {
            res.status(500).send(err);
        })
})
app.get('/api/todos/:id', (req, res) => {
    Todos.findOne({ _id: req.params.id }).then(foundTodo => {
        res.send(foundTodo);
    })
        .catch(err => {
            res.status(500).send(err);
        })
})

app.post("/", (req, res) => {
    let todosData = req.body;
    let newTodo = new Todos(todosData);

    newTodo.save().then(savedtodo => {
        res.send(savedtodo);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});



// put routes here

app.patch('api/todos/:id', (req, res) => {
    Todos.updateOne({ _id: req.params.id }, req.body)
        .then(updatedTodo => {
            res.send(updatedTodo);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

app.post("/api/todos/", (req, res) => {
    let todosData = req.body;
    let newTodo = new Todos(todosData);

    newTodo.save().then(savedtodo => {
        res.send(savedtodo);
    })
        .catch(err => {
            res.status(500).send(err);
        })
});

app.put('/api/todos/:id', (req, res) => {
    Todos.updateOne({ _id: req.params.id }, req.body)
        .then(updatedTodo => {
            res.send(updatedTodo);
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


app.delete('/todos/:id', (req, res) => {
    Todos.deleteOne({ _id: req.params.id })
        .then(() => {
            res.send("Deleted Record");
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
