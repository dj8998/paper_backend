const User = require('../models/user');
const Point = require('../models/points')

exports.addPoint = (req, res) => {

    

    User.findOne({username: req.body.username})
    .exec((error, user) =>{
        if(user){
            Point.findOne({username: req.body.username})
            .exec((er,po) =>{
                if(er){
                    return res.status(400).json({ er })
                    
                }
                if(po){
                    //upadate the point
                    Point.findOneAndUpdate({username: req.body.username}, {
                        "$inc": {
                                point: req.body.point                              
                        }
                    })
                    .exec((error, _point) =>{
                        if(error){
                            return res.status(400).json({error});
                        }
                        if(_point){
                            return res.status(201).json({_point})
                        }
                    })
                }else{
                    const point = new Point({
                        user: req.user._id,
                        point: req.body.point,
                        username: req.body.username
                    })
                
                    point.save((error, point) =>{
                        if(error){
                            return res.status(400).json({error});
                        }
                        if(point){
                            return res.status(201).json({point})
                        }
                    })
                }
            })
            
        }else{
                console.log(error)
                return res.status(400).json({ message: 'user does not exist' })
        }
    })
}