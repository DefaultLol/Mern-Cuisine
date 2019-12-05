const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const fileUpload=require('express-fileupload');
const fs=require('fs');

require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;
const uri=process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));


mongoose.connect(uri,{ useNewUrlParser:true, useCreateIndex:true });

const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB database connection established succefully");
});

const categories=require('./routes/categories');
const items=require('./routes/items');

app.use('/categories',categories);
app.use('/items',items);


app.listen(port,()=>{
  console.log(`Listening to port ${port}...`);
});
