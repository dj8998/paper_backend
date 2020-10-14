const Point = require('../models/points');

exports.dashboard =  (req, res) =>{
    const {user} = req.params;
    console.log(user)
    Point.findOne({username: user}).exec((error,point) =>{
        console.log(user)
        if(point){
           return res.status(200).json({point})
        }else{
            return res.status(400).json({message:"invalide username"})
        }
    })
}