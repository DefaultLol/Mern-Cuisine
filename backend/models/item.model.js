const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const itemSchema=new Schema({
  name:{
    type:String
  },
  qty:{
    type:Number
  },
  image:{
    type:String
  },
  category:{
    type:String
  }
});

const Item=mongoose.model('Item',itemSchema);

module.exports=Item;
