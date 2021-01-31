var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('../schema/books');
var Books = new mongoose.model('Books');
mongoose.connect("mongodb+srv://dev:admin@cluster0.yphic.mongodb.net/bookservice",(err, res) =>{
if(err) throw err;
console.log('Database connected');
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/books",(req,res) => {
  Books.find({},(err,result) =>{
      console.log(result);
      res.jsonp(result);
  })
});

router.post("/searchbooks",(req,res) => {
  let searchtext = req.body.searchtext;
  Books.find({"title": { "$regex":searchtext, "$options": "i" } },(err,result) =>{
      console.log(result);
      res.jsonp(result);
  })
});

router.post('/book',(req,res) =>{
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

module.exports = router;
