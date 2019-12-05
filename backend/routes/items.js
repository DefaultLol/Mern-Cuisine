const express=require('express');
const Item=require('../models/item.model');

const router=express.Router();
const app=express();

//get All items
router.route('/').get((req,res)=>{
  Item.find()
    .then(items=> res.json(items))
    .catch(err=> res.status(400).json('Error: '+err));
});

//get one item with the specified id
router.route('/:id').get((req,res)=>{
  Item.findById(req.params.id)
    .then(item=> res.json(item))
    .catch(err=> res.status(400).json("Error: "+err));
});

//get items with the categorie specified in the url
router.route('/findByCat/:cat').get((req,res)=>{
  const category=req.params.cat;
  Item.find({category:category})
    .then(items => res.json(items))
    .catch(err => res.status(400).json("Error : "+err));
});

router.route('/upload').post((req,res)=>{
  const file=req.files.file;
  file.mv(`C:/Users/Tarik Ouhamou/Desktop/Mern cuisine/backend/public/uploads/${file.name}`,err=>{
    if(err){
      console.log(err);
      return res.status(400).send(err);
    }
    res.json({fileName:file.name,filePath:`/uploads/${file.name}`});
  });
});

router.route('/add').post((req,res)=>{
  const name=req.body.name;
  const qty=Number(req.body.qty);
  const image=req.body.image;
  const category=req.body.category;

  const newItem=new Item({name,qty,image,category});

  newItem.save()
    .then(()=> res.json('Item added'))
    .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/update/:id').put((req,res)=>{
  Item.findById(req.params.id)
    .then(exercise=>{
      exercise.qty=req.body.qty;
      exercise.save()
        .then(() => res.json('Item updated'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
  const id=req.params.id;
  Item.findByIdAndRemove(id)
    .then(()=>res.json("User deleted"))
    .catch(err=> res.status(400).json("Error: "+err));
});

module.exports=router;
