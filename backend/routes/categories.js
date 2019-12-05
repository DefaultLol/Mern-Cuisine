const router=require('express').Router();
const Categorie=require('../models/categorie.model');

router.route('/').get((req,res)=>{
  console.log(__dirname);
  Categorie.find()
    .then(categories=> res.json(categories))
    .catch(err=> res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
  console
  Exercise.findById(req.params.id)
    .then(categorie=> res.json(categorie))
    .catch(err=> res.status(400).json("Error: "+err));
});

router.route('/add').post((req,res)=>{
  const name=req.body.name;

  const newCategorie=new Categorie({name});

  newCategorie.save()
    .then(()=> res.json('Categorie added'))
    .catch(err=> res.status(400).json('Error: '+err));
});

module.exports=router;
