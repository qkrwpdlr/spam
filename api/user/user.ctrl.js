const models = require("../../models");

var index=function(req,res){
    models.User.findAll({}).then((users)=>{
        res.json(users).end();
    });
};
var show=function(req,res){
    var id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    models.User.findOne({
        where:{
            id : id
        }
    }).then((user=>{
        if(!user) return res.status(404).end();
        res.json(user);    
    }))
}
var del=function(req,res){
    var id=parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
    models.User.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.status(204).end();

    }) 
}
var write=function(req,res){
    var name = req.body.name;
    if(!name) return res.status(400).end();
    models.User.create({name}).then((user)=>{
        return res.status(201).json(user);
    })
    .catch(err=>{
        if(err.name=='SequelizeUniqueConstraintError'){
            return res.status(409).end()
        }
    })
}
var rewrite=function(req,res){
    var name = req.body.name;
    var id=parseInt(req.params.id,10);
    models.User.findOne({
        where:{id:id}
    }).then((user)=>{
          user.name = name;
          user.save() 
              .then(user=>{
                return res.json(user)
              })
    })
}
module.exports={index,show,del,write,rewrite};