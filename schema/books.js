const mongoose = require('mongoose');
const { stringify } = require('querystring');

mongoose.model('Books',{
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberPages:{
        type:Number,
        require:false
    },
    publisher:{
        type:String,
        require:false
    },
})