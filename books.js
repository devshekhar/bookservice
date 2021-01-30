const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./schema/books')

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://dev:admin@cluster0.yphic.mongodb.net/bookservice",(err, res) =>{
if(err) throw err;
console.log('Database connected');
})
const Books =mongoose.model('Books');
app.get('/',(req,res) =>{
    res.send('this is our main end point');
})

app.post('/book',(req,res) =>{
const newBook = {
    title:req.body.title,
    publisher:req.body.publisher,
    numberPages:req.body.numberPages,
    author:req.body.author
}
var book = new Books(newBook);
book.save();
res.send('testing our book route')
});

app.get("/books",(req,res) => {
    Books.find({},(err,result) =>{
        console.log(result);
        res.jsonp(result);
    })
})

app.get("/books/:id",(req,res) => {
    Books.find({_id:req.params.id},(err,result) =>{
        console.log(result);
        res.jsonp(result);
    }).catch(err =>{
        throw err;
    })
})

app.delete("/books/:id",(req,res) => {
    Books.findOneAndRemove({_id:req.params.id},(err,result) =>{
        console.log(result);
        res.jsonp(result);
    }).catch(err =>{
        throw err;
    })
})


app.listen(4545,() =>{
    console.log('Up and running book service');
})